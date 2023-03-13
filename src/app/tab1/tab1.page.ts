import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuxilioRapidoComponent } from '../Paginas/auxilio-rapido/auxilio-rapido.component';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public datausuario : any;

  constructor( 
    private router: Router,
    public modalController: ModalController,
    public popoverController: PopoverController,
    private usuarioService : UsuarioService

    ) {
      this.datausuario = usuarioService.getDatosSesionUsuario();

    }

    regresar(){
      this.usuarioService.clearDatosSesionUsuario();
      this.router.navigateByUrl('login', { replaceUrl: true });
    }
    seleccionVecinoVigilante(idCategoriaAlerta : string){
      this.router.navigateByUrl('seleccionarcatvecinovig/' + idCategoriaAlerta, { replaceUrl: true });
      //this.router.navigate(["seleccionarcatvecinovig", idCategoriaAlerta]);

    }

  // async auxilioRapido(){
  //   const popover = await this.popoverController.create({
  //     component: AuxilioRapidoComponent,
  //     componentProps: { 
  //       dataviaje : {
         
  //       }
  //     },
  //     cssClass: 'my-custom-class',
  //     // event: ev,
  //     // translucent: true
  //   });
  //   await popover.present();
  //   const { role } = await popover.onDidDismiss();
  //   console.log('onDidDismiss resolved with role', role);
  // }

  // async contactoEnLinea(){

  //   const popover = await this.modalController.create({
  //     component: InicioComponent,
  //     componentProps: { 
  //       data : {
         
  //       }
  //     },
  //     cssClass: 'my-custom-class',
  //     // event: ev,
  //     // translucent: true
  //   });
  //   await popover.present();
  //   const { role } = await popover.onDidDismiss();
  //   console.log('onDidDismiss resolved with role', role);
  // }
}
