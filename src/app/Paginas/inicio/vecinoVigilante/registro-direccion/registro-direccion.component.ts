import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl , Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Importar el servicio ActivatedRoute
import { environment } from  './../../../../../environments/environment';

import { 
  ModalController, PickerController,ActionSheetController, NavController,
  RangeCustomEvent,ToastController ,LoadingController,AlertController 
} from '@ionic/angular';

import { Router } from '@angular/router';
import { RangeValue } from '@ionic/core';
import { Geolocation } from '@capacitor/geolocation';
import { ReporteService} from '../../../../services/reporte.service';
import { UsuarioService} from '../../../../services/usuario.service';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';

// import { VoiceRecorderPlugin, VoiceRecorderResult } from 'capacitor-voice-recorder';
import { Plugins } from '@capacitor/core';


import { MediaCapture, MediaFile, CaptureError } from '@awesome-cordova-plugins/media-capture/ngx';
// import { Media, MediaObject } from '@ionic-native/media';

// import { Plugins } from '@capacitor/core';
// const { VoiceRecorder } = Plugins;

declare var google : any;


@Component({
  selector: 'app-registro-direccion',
  templateUrl: './registro-direccion.component.html',
  styleUrls: ['./registro-direccion.component.scss'],
})


export class RegistroDireccionComponent implements OnInit {

  // private recorder: VoiceRecorderPlugin;
  loading : boolean = false;
  datosUsuario :any;
  currentStep = 0;
  lastEmittedValue: RangeValue;
  mapLoaded = false;
  imagenesCargadas : any = [];
  @ViewChild('contenidomapa', {static: false}) mapElement: ElementRef;
  isChecked: boolean = false;



  step1Form = new FormGroup({
    direccionalerta: new FormControl(),
    referenciadireccion: new FormControl()

  });

  step2Form = new FormGroup({
    observacionalerta: new FormControl('', Validators.required),
    esanonimo : new FormControl()
  });

  categoriaSeleccionada : string;
  idcategoriaSeleccionada : string;

  constructor(
    private router: Router, 
    private activatedRoute :ActivatedRoute,
    private toastController : ToastController,
    private reporteService : ReporteService,
    private loadingController : LoadingController,
    private alertController: AlertController,
    private usuarioService: UsuarioService,
    private actionSheetCtrl: ActionSheetController,
    private mediaCapture: MediaCapture
    // private voiceRecorderPlugin: VoiceRecorderPlugin
  ) { 
    this.lastEmittedValue= 0;
    this.mapElement = new ElementRef(document.getElementById('contenidomapa'));
    this.categoriaSeleccionada = "";
    this.idcategoriaSeleccionada = "";
    // this.recorder = Plugins.VoiceRecorder as VoiceRecorderPlugin;

  }

  map : any;
  currentPosition: any;
  currpositionmarker :any;
  ngOnInit() {

    this.datosUsuario = this.usuarioService.getDatosSesionUsuario();

    this.step1Form = new FormGroup({
      direccionalerta: new FormControl('', Validators.required),
      referenciadireccion: new FormControl()
    });

    this.step2Form = new FormGroup({
      observacionalerta: new FormControl('', Validators.required),
      esanonimo : new FormControl()
    });


    this.activatedRoute.params.subscribe(params => {
      this.categoriaSeleccionada = params['categoria'];
      this.idcategoriaSeleccionada =params['idcategoria'];
     //let placabusqueda = params['placabusqueda'];
    })

  }

  // startRecording() {
  //   console.log("graba pe");
  //   this.mediaCapture.captureAudio().then(
  //     (data: any) =>{
  //       console.log(data)
  //     },
  //     (err: CaptureError) =>{
  //       console.log("ERROR--");
  //       console.error(err)
  //     }
      
  //   );
  // }

  // stopRecording() {
  //   // this.mediaCapture.
  //   this.mediaCapture.stopRecord();
  // }
  

  // async startRecording() {
    // try {
    //   const result: VoiceRecorderResult = await VoiceRecorder.startRecording();
    //   this.recordingFilePath = result.path;
    // } catch (error) {
    //   console.log(error);
    // }
 // }

  // async stopRecording() {
  //   try {
  //     await VoiceRecorder.stopRecording();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async playRecording() {
  //   try {
  //     const recorder: VoiceRecorderPlugin = VoiceRecorder as VoiceRecorderPlugin;
  //     await recorder.playRecording({ path: this.recordingFilePath });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  ngAfterViewInit() {

    Geolocation.getCurrentPosition().then((position) => {

      this.currentPosition = {
        latitud : position.coords.latitude,
        longitud :position.coords.longitude
      }

      this.loadMap(this.currentPosition);

      console.log("current posicion", this.currentPosition)
    }).catch((error) => {
      console.log('Error getting location', error);
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

    this.map.addListener("click", (mapsMouseEvent: any) => {
      // Close the current InfoWindow.
      const imgcurrposition = "./assets/imagenes/currposition_.png";
      const position = new google.maps.LatLng(mapsMouseEvent.latLng.lat(),  mapsMouseEvent.latLng.lng());
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

    });
  }

  regresar(){
    this.router.navigateByUrl('seleccionarcatvecinovig/' +this.idcategoriaSeleccionada , { replaceUrl: true });

  }

  cancelar(){
    this.router.navigateByUrl('seleccionarcatvecinovig/' +this.idcategoriaSeleccionada , { replaceUrl: true });
  }
  
  formularioUnoEsValido(){
    return this.step1Form.valid;
  }

  formularioDosEsValido(){
    return this.step2Form.valid;
  }

  onIonChange(ev: Event) {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
  }

  nextStep() {


    switch (this.currentStep) {
      case 0:
        if(this.formularioUnoEsValido()){this.currentStep++;}else{this.mostrarAlertaFormularioNoValido()}
        break;
      case 1:
        if(this.formularioDosEsValido()){this.currentStep++;}else{this.mostrarAlertaFormularioNoValido()}
        break;
      default:
        break;
    }
  }

  async mostrarAlertaFormularioNoValido(){
    const toast = await this.toastController.create({
      message: 'No puede continuar, verificar los datos ingresados.',
      duration: 5000,
      position : 'top'
    });

    toast.present();
  }

  previousStep() {
    this.currentStep--;
  }

  submit() {
    const formValues = Object.assign({}, this.step1Form.value, this.step2Form.value);

    //verifica si hay latitud y longitud
 
    if(this.currpositionmarker){
        var position = this.currpositionmarker.getPosition();
        var latitud = position.lat();
        var longitud = position.lng();

        if(this.formularioDosEsValido() && this.datosUsuario.idusuario){
      
          this.activarLoading("Registrando, espere porfavor...");

          this.imagenesCargadas
          var contentType = "";
          var extensionimg = "";
          var base64Data = "";

          if(this.imagenesCargadas.length > 0){ //hay foto cargada
            contentType = this.imagenesCargadas[0]["contentType"];
            extensionimg = this.imagenesCargadas[0]["extensionimg"];
            base64Data = this.imagenesCargadas[0]["base64img"];

          }


          var dataEnvio = {
            "idCategoria": this.idcategoriaSeleccionada,
            "idUsuarioRegistro": this.datosUsuario.idusuario,
            "subCategoria": this.categoriaSeleccionada,
            "direccionAlerta": formValues.direccionalerta, 
            "direccionReferencia":formValues.referenciadireccion ?  formValues.referenciadireccion : '', 
            "latitud": latitud, 
            "longitud": longitud, 
            "nombreFotoArr": "", 
            "descripcionAlerta" : formValues.observacionalerta, 
            "nombreAudio": "",
            "contentType": contentType,
            "extensionimg": extensionimg,
            "base64Data": base64Data,
            "esAnonimo" : (this.isChecked ? 1 : 0)
          };
    
          this.loading = true;
          this.reporteService.registrarAlerta(dataEnvio).subscribe(
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
                  this.limpiarFormulario();//limpia todos los datos del formulario
                }
                //
                this.mostrarMensajeConfirmacion(
                  desResultado, 
                  (codResultado ==1 ? true:false),
                  (codResultado ==1 ? "Registro exitoso": "Notificación") 
                );
              }else{
                this.mostrarMensajeConfirmacion("Ocurrió un error al llamar al servicio.", false, "Notificación");
              }
            },
            error =>{ //ocurrió un error 
              this.loading = false;
              this.mostrarMensajeConfirmacion("Ocurrió un error en el servicio.", false, "Notificación");
            }
          );
    
        }else{
          this.mostrarAlertaFormularioNoValido()
        }
    }else{
      this.mostrarMensajeConfirmacion("Debe dar click en el mapa para enviar la ubicación exacta y poder revisar el caso.", false, "Notificación");

      //mostrar mensaje de que no existe el marcado por lo tanto no hay latitud ni longitud
    }



  }

  onCheckboxChange(){

  }

  limpiarFormulario(){

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
              this.router.navigateByUrl('tabinicio', { replaceUrl: true });

            }
          }
        }
      ]
    }).then(res => {
      res.present();
    });
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
