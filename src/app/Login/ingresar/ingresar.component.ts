import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuxilioRapidoComponent} from '../../Paginas/auxilio-rapido/auxilio-rapido.component';
import { IonModal } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl , Validators } from '@angular/forms';
import { UsuarioService} from '../../services/usuario.service';
import { ModalController, PickerController, NavController,AlertController, LoadingController, ToastController } from '@ionic/angular';
import { environment } from  './../../../environments/environment';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.scss'],
})
export class IngresarComponent implements OnInit {

  formularioLogin = new FormGroup({
    usuario: new FormControl(),
    clave: new FormControl(),
  });

  datosUsario : any;
  loading : boolean = false;
  constructor( 
    private router: Router,
    public modalController: ModalController,
    public popoverController: PopoverController,
    private usuarioService : UsuarioService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController :ToastController
    ) {

    }

  ngOnInit() {

    this.formularioLogin = new FormGroup({
      usuario: new FormControl('', Validators.required),
      clave: new FormControl('', Validators.required)
    });

    this.datosUsario = this.usuarioService.getDatosSesionUsuario();

    console.log("dato usuario",this.datosUsario);
  }

  iniciaSesion(){

    if(!this.formularioLogin.valid){
      this.mostrarAlertaFormularioNoValido();
      return;
    }
    const formValues = Object.assign({}, this.formularioLogin.value);

    var dataEnvio = {
      usuario : formValues.usuario,
      clave : formValues.clave,
    };

    this.loading = true;

    this.usuarioService.loginUsuario(dataEnvio).subscribe(
      (data :any) =>{

        // console.log("RESPONSAEEEe");
        // console.log(data);
        setTimeout(() => this.desactivarLoading(), 500);
        this.loading = false;

        var success = data.success;
        var codResultado = 0;
        var desResultado = "";
        if(success){
          console.log("--->>", data);
          codResultado = data.codRespuesta;
          desResultado = data.desRespuesta;
          //
        
          //
          this.mostrarMensajeConfirmacion(
            desResultado, 
            (codResultado == 1 ? true:false),
            (codResultado == 1 ? "Mensaje": "Notificación") 
          );

          if(codResultado == 1){
            var dataGuardaLogin = {
              idusuario : data.auxiliar,
              nombreUsuario : dataEnvio.usuario,
              codUsuarioPerfil : data.codUsuarioPerfil,
              nombresPersona: data.nombresPersona
            };
            this.usuarioService.setDatosSesionPasajero(dataGuardaLogin);
          }
        }else{
          this.mostrarMensajeConfirmacion("Ocurrió un error al llamar al servicio.", false, "Notificación");
        }
      },
      error =>{ //ocurrió un error 
        this.loading = false;
        this.mostrarMensajeConfirmacion("Ocurrió un error en el servicio.", false, "Notificación");
      }
    );
    //this.router.navigateByUrl('tabinicio', { replaceUrl: true });
  }


  async verificarServicioHost(){

    // console.log("holaaaa");
    var hostGuardado = (this.usuarioService.getHostAPI() ? this.usuarioService.getHostAPI() : '--');

    console.log("HOST GUARDADO--", hostGuardado);
    const alert = await this.alertController.create({
      header: 'HOST ACTUAL : \n' + hostGuardado,
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Host API AQUI'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Prompt cancelado');
          }
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            console.log('Nombre ingresado:', data.name);

            var urlHOST = data.name;
            this.usuarioService.setHostAPI(urlHOST);

          }
        }
      ]
    });
  
    await alert.present();

  }

  registrarUsuario(){
    this.router.navigateByUrl('preregistro', { replaceUrl: true });
  }

  async mostrarAlertaFormularioNoValido(){
    const toast = await this.toastController.create({
      message: 'No puede continuar, verificar los datos ingresados.',
      duration: 5000,
      position : 'top'
    });

    toast.present();
  }

  async auxilioRapido(){
    const popover = await this.modalController.create({
      component: AuxilioRapidoComponent,
      componentProps: { 
        dataviaje : {
         
        }
      },
      cssClass: 'my-custom-class',
      // event: ev,
      // translucent: true
    });
    await popover.present();
    const { role } = await popover.onDidDismiss();
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

}
