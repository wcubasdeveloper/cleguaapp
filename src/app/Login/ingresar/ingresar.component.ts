import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuxilioRapidoComponent} from '../../Paginas/auxilio-rapido/auxilio-rapido.component';
import { IonModal } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl , Validators } from '@angular/forms';
import { UsuarioService} from '../../services/usuario.service';
import { ModalController, PickerController, NavController,AlertController, LoadingController, ToastController } from '@ionic/angular';

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

    this.usuarioService.loginUsuario(dataEnvio).subscribe(
      (data :any) =>{

        setTimeout(() => this.desactivarLoading(), 500);

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
              nombreUsuario : dataEnvio.usuario
            };
            this.usuarioService.setDatosSesionPasajero(dataGuardaLogin);
          }
        }else{
          this.mostrarMensajeConfirmacion("Ocurrió un error al llamar al servicio.", false, "Notificación");
        }
      }
    );
    //this.router.navigateByUrl('tabinicio', { replaceUrl: true });
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
