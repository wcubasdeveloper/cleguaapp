import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';
import { 
  ModalController, PickerController,ActionSheetController, NavController,
  RangeCustomEvent,ToastController ,LoadingController,AlertController 
} from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl , Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { ReporteService } from '../../../services/reporte.service';

import { Router } from '@angular/router';

declare var google : any;

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  objetoRecibido: any;
  imagenesCargadas : any = [];
  @ViewChild('contenidomapaatencion', {static: false}) mapElement: ElementRef;

  step1Form = new FormGroup({
    descripcionAtencion: new FormControl()
  });
  map : any;
  currentPosition: any;
  currpositionmarker :any;
  public isPolicia : boolean = false;
  public dataUsuario : any;
  public urlImagenRegistro : string = "";
  latitudAlerta : number = 0;
  longitudAlerta : number = 0;
  loading : boolean = false;
  atiendeAlertaBool : boolean = false;
  urlImagenAtencion : string = "";
  descripcionAtencion : string = "";
  canDismiss = false;
  constructor(
    private route: ActivatedRoute,
    private toastController : ToastController,
    private actionSheetCtrl: ActionSheetController,
    private usuarioService : UsuarioService,
    private router: Router,
    private loadingController : LoadingController,
    private reporteService: ReporteService,
    private alertController : AlertController,
    private modalController : ModalController,
    private navController: NavController
    ) {
      this.mapElement = new ElementRef(document.getElementById('contenidomapaatencion'));
      this.dataUsuario = this.usuarioService.getDatosSesionUsuario();
      this.isPolicia = (this.dataUsuario.codUsuarioPerfil == 3 ? true : false);
     
    }

    //{{ objetoRecibido.Nombres}}
  ngOnInit() {
  var objetoString = this.route.snapshot.queryParamMap.get('objetoEnviado');
    //    
    if (objetoString !== null) {
      this.objetoRecibido = JSON.parse(objetoString);
      console.log("--->>", this.objetoRecibido);
      let HOST_API = this.usuarioService.getHostAPI() + '/apiclegua/adjuntos/fotoReporteAlertas/';
      let HOST_API_ATENCION = this.usuarioService.getHostAPI() + '/apiclegua/adjuntos/fotoAtencionAlertas/';

      this.urlImagenRegistro = HOST_API + this.objetoRecibido.nombresFotosArr;
      this.urlImagenAtencion = HOST_API_ATENCION + this.objetoRecibido.arrFotoAtencion;
      this.latitudAlerta = Number(this.objetoRecibido.latitudAlerta);
      this.longitudAlerta =Number(this.objetoRecibido.longitudAlerta);
      this.descripcionAtencion =  this.objetoRecibido.descripcionAtencion;
      this.atiendeAlertaBool = (this.objetoRecibido.idEstadoAlerta == 3 ? false  : true);

    }
    //this.objetoRecibido = JSON.parse(objetoString);
  }

  ngAfterViewInit() {
    
    console.log("valores",this.atiendeAlertaBool , this.isPolicia);
    console.log("his.dataUsuario", this.dataUsuario);

    this.loadMap({
      latitud : this.latitudAlerta,
      longitud :  this.longitudAlerta
    });
  }

  loadMap(objLatitudLongitud : any) {

    console.log("latlng",objLatitudLongitud);

    let latLng = new google.maps.LatLng( -12.0453, -77.0311);
    let mapOptions = {
     center : latLng,
     zoom : 15,
     disableDefaultUI: true,
     //mapTypeId : google.maps.MapTypeId.ROADMAP,
    //  zoom: 19.5,
    // heading: 320,
    //   tilt: 27.5,
    //  mapId: "90f87356969d889c",
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    const imgcurrposition = "./assets/imagenes/currposition_.png";
    const position = new google.maps.LatLng(objLatitudLongitud.latitud, objLatitudLongitud.longitud);
  
    if(!this.currpositionmarker){
      this.currpositionmarker = new google.maps.Marker({
        position: position,
        map : this.map,
        icon: imgcurrposition,
        zIndex: 30 
      });
    }else{
      this.currpositionmarker.setPosition(position);
    }

    this.map.panTo(position);
    this.map.setZoom(17);

    // this.map.addListener("click", (mapsMouseEvent: any) => {
    //   const imgcurrposition = "./assets/imagenes/currposition_.png";
    //   const position = new google.maps.LatLng(mapsMouseEvent.latLng.lat(),  mapsMouseEvent.latLng.lng());
    //   if(!this.currpositionmarker){
    //     this.currpositionmarker = new google.maps.Marker({
    //       position: position,
    //       map : this.map,
    //       icon: imgcurrposition,
    //       zIndex: 30 
    //     });
    //   }else{
    //     this.currpositionmarker.setPosition(position);
    //   } 
    //   this.map.panTo(position);

    // });
  }

  atiendeAlerta(){
    const formValues = Object.assign({}, this.step1Form.value);
    console.log("formValues",formValues)
    var contentType = "";
    var extensionimg = "";
    var base64Data = "";
    var descripcionAlerta = formValues.descripcionAtencion ? formValues.descripcionAtencion : "";


    if(descripcionAlerta.length > 0){
      console.log("img cargadas", this.imagenesCargadas.length);

      if(this.imagenesCargadas.length > 0){ //hay foto cargada
        contentType = this.imagenesCargadas[0]["contentType"];
        extensionimg = this.imagenesCargadas[0]["extensionimg"];
        base64Data = this.imagenesCargadas[0]["base64img"];
      }

      this.activarLoading("Registrando, espere porfavor...");

      const paramEnvio = {
        "idRegistroAtencion": this.objetoRecibido.idRegistroAlerta,
        "idUsuarioAtencion" : this.dataUsuario.idusuario,
        "descripcionAtencion" : descripcionAlerta,
        "base64ImgAtencion" : base64Data,
        "mimetype" : contentType,
        "extension" : extensionimg
      };

      this.loading = true;
      this.reporteService.atenderAlerta(paramEnvio).subscribe(
        (data :any) =>{
          setTimeout(() => this.desactivarLoading(), 500);
          this.loading = false;
          var success = data.success;
          var codResultado = 0;
          var desResultado = "";
          if(success){
            codResultado = data.codRespuesta;
            desResultado = data.desRespuesta;
            //
            if(codResultado == 1){
              this.step1Form = new FormGroup({
                descripcionAtencion: new FormControl()
              });
              this.canDismiss = true;
            this.cerrarmodal();
            }
            //
            this.mostrarMensajeConfirmacion(
              desResultado, 
              (codResultado ==1 ? true: false) ,
              (codResultado ==1 ? "Registro exitoso": "Notificación") 
            );
          }else{
            this.mostrarMensajeConfirmacion("Ocurrió un error al llamar al servicio.", false, "Notificación");
          }

        },
        error =>{ //ocurrió un error 
    
          this.mostrarMensajeConfirmacion("Ocurrió un error en el servicio.", false, "Notificación");
        }
      );
    }else{
      this.mostrarMensajeConfirmacion("Debe registrar la descripción de la atención.", false, "Notificación");
    }



  }

  cerrarmodal(){
    this.canDismiss = true;
    //modal.dismiss()
    return this.modalController.dismiss(null, 'cancel');

  }

  redireccionarpruebda(){
    this.modalController.dismiss(null, 'cancel');
    // this.navController.navigateForward('tabinicio/tabs/tab2', { queryParams: { objetoEnviado: JSON.stringify("") } });
    this.router.navigateByUrl('tabinicio/tabs/tab2', { replaceUrl: true });
    //this.router.navigate(['tabinicio/tabs/tab2']);

    // this.router.navigate(['/tabinicio/tabs/tab2'], { queryParams: { parametro: 'valor' }});


  }

  mostrarMensajeConfirmacion(mensaje : string, redireccionaLogin : boolean, subtitulo : string){
    const notificacionDeUso = this.alertController.create({
      header: subtitulo,
      cssClass: 'alerta-roja',
      message:  mensaje,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if(redireccionaLogin){
              this.router.navigateByUrl('tabinicio/tabs/tab2', { replaceUrl: true });

            }
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  activarLoading(textoloading : string) {
    this.loadingController.create({
        message: textoloading,
    }).then((response) => {
        response.present();
    });
  }

  desactivarLoading() {
    this.loadingController.dismiss().then((response) => {
        console.log('Loader closed!', response);
    }).catch((err) => {
        console.log('Error occured : ', err);
    });
  }
  
  regresar(){
    this.router.navigateByUrl('tabinicio/tabs/tab2', { replaceUrl: true });
    //this.router.navigate(["tabinicio/tabs/tab2"]);
  }

  async selectImageSource() {
    const buttons = [
      {
        text: 'Tomar una foto',
        icon: 'camera',
        handler: () => {
          //this.addImage(CameraSource.Camera);
          this.agregarImagen(CameraSource.Camera);
        }
      }
      ,
      {
        text: 'Seleccionar una foto',
        icon: 'image',
        handler: () => {
          this.agregarImagen(CameraSource.Photos);
        }
      }
    ];
 
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Foto de la incidencia',
      buttons
    });
    await actionSheet.present();
  }

  async agregarImagen(source: CameraSource) {
   
    const toast = await this.toastController.create({
      message: '',
      duration: 8000,
      position : 'middle'
    });
    
    const image = await Camera.getPhoto({ 
      quality: 20,
      allowEditing: false,
      // resultType: CameraResultType.Uri,
      resultType : CameraResultType.Base64,
      source
    });
    //

    //
    let imagencargada : any = {
      base64img :image.base64String,
      contentType : "image/"+ image.format,
      urlimagen : "data:image/"+ image.format+";base64," + image.base64String,
      extensionimg : image.format
    }
    
    // if(this.imagenesCargadas.length > 3){
    //   toast.message = "Solo se puede cargar como máximo 4 fotos";
    //   toast.present();
    //   return false;
    // }
    //
    if(this.imagenesCargadas.length > 0){
      this.quitarimagen();
    }
    
    this.imagenesCargadas.push(imagencargada);
    console.log("imagenesCargadas->", this.imagenesCargadas)
    // this.dismissLoader();
  }

  quitarimagen(){
    var sectionFoto = document.getElementsByClassName('imagencargadaunica')[0];
    sectionFoto.remove();
    this.imagenesCargadas = [];
  }

}
