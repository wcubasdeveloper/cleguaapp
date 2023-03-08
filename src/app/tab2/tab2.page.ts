import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ReporteService } from '../services/reporte.service';
import { ModalController, PickerController, NavController,AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public listaAlertas : any[] = [];
  constructor(
    private usuarioService : UsuarioService,
    private reporteService : ReporteService,
    private alertController: AlertController,
    private loadingController: LoadingController
    ) {


  }


  ionViewWillEnter(){
    var dataUsuario = this.usuarioService.getDatosSesionUsuario();
    this.listarAlertasPorUsuario();
    //console.log("dataUsuario", dataUsuario);
  }

  listarAlertasPorUsuario(){
    this.activarLoading("Cargando información...");
    this.reporteService.listaAlertaPorUsuario(this.usuarioService.getDatosSesionUsuario().idusuario).subscribe(
      (data :any) =>{
        setTimeout(() => this.desactivarLoading(), 500);

        console.log("data alertas", data);
        this.listaAlertas = data;

        //{{item.idEstadoAlerta}}
      },
      error =>{ //ocurrió un error 
  
        this.mostrarMensajeConfirmacion("Ocurrió un error en el servicio.", false, "Notificación");
      }
    );
  }

  async enviarMensajeWpp(celular:string){
    var urlEnviarMensaje = "https://wa.me/51"+ celular +"/?text=" + "Usted a enviado una alerta al centro de control de la munipalidad de Carmen de la Legua, Quisiera que nos brinde mas información.";
    await Browser.open({ url: urlEnviarMensaje });
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

            }
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

}
