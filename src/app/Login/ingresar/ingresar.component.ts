import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuxilioRapidoComponent} from '../../Paginas/auxilio-rapido/auxilio-rapido.component';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.scss'],
})
export class IngresarComponent implements OnInit {

  constructor( 
    private router: Router,
    public modalController: ModalController,
    public popoverController: PopoverController
    ) {

    }

  ngOnInit() {}

  iniciaSesion(){
    this.router.navigateByUrl('tabinicio', { replaceUrl: true });
  }

  async auxilioRapido(){
    console.log("dd");
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

}
