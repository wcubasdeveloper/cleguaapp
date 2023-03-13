import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ReporteService } from '../services/reporte.service';
import { ModalController, PickerController, NavController,AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { CommonModule } from '@angular/common'; // Agrega esta línea
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public listaAlertas : any[] = [];
  public dataUsuario : any;
  public isPolicia : boolean = false;
  public cargandoListaMisAlertas : boolean = false;
  constructor(
    private usuarioService : UsuarioService,
    private reporteService : ReporteService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
    private navController: NavController
    ) {
      console.log("ADENTRITO")
      this.dataUsuario = this.usuarioService.getDatosSesionUsuario();
      this.isPolicia = (this.dataUsuario.codUsuarioPerfil == 3 ? true : false);
    }


  ionViewWillEnter(){
    console.log("ESTOY ADENTRITO");

    this.dataUsuario = this.usuarioService.getDatosSesionUsuario();
    this.listarAlertasPorUsuario();
    console.log("dataUsuario", this.dataUsuario);
  }

  // ionViewDidEnter() {
  //   const parametro = this.route.snapshot.queryParamMap.get('parametro');
  //   if (parametro === 'valor') {
  //     console.log("ESTOY ADENTRITO");

  //   }
  // }

  ngOnInit(){

    // var objetoString = this.route.snapshot.queryParamMap.get('objetoEnviado');
    // if (objetoString !== null) {


    // }
  }
  mostrarDetalle(objAlerta : any){
    //console.log(objAlerta);
    this.navController.navigateForward('detallealerta', { queryParams: { objetoEnviado: JSON.stringify(objAlerta) } });
    // this.navCtrl.navigateForward('/componente2', { queryParams: { objetoEnviado: JSON.stringify(this.objeto) } });
    //this.router.navigateByUrl('seleccionarcatvecinovig/' + idCategoriaAlerta, { replaceUrl: true });

  }

  listarAlertasPorUsuario(){
    this.activarLoading("Cargando información...");
    this.reporteService.listaAlertaPorUsuario(this.usuarioService.getDatosSesionUsuario().idusuario).subscribe(
      (data :any) =>{
        setTimeout(() => this.desactivarLoading(), 500);

        this.cargandoListaMisAlertas = true;
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
