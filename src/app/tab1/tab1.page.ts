import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuxilioRapidoComponent } from '../Paginas/auxilio-rapido/auxilio-rapido.component';
import { InicioComponent} from '../Paginas/ContactoLinea/inicio/inicio.component';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( 
    private router: Router,
    public modalController: ModalController,
    public popoverController: PopoverController
    ) {

    }
  async auxilioRapido(){
    const popover = await this.popoverController.create({
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
    console.log('onDidDismiss resolved with role', role);
  }

  async contactoEnLinea(){

    const popover = await this.modalController.create({
      component: InicioComponent,
      componentProps: { 
        data : {
         
        }
      },
      cssClass: 'my-custom-class',
      // event: ev,
      // translucent: true
    });
    await popover.present();
    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
