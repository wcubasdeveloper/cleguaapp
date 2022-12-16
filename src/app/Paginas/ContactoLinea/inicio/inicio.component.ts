import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ChatComponent} from '../chat/chat.component';
import { SolicitaCitaComponent} from '../solicita-cita/solicita-cita.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  constructor(public modalController: ModalController,) { }

  ngOnInit() {}


  async abrirChat(){
    const popover = await this.modalController.create({
      component: ChatComponent,
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

  async abrirCita(){
    const popover = await this.modalController.create({
      component: SolicitaCitaComponent,
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

  
  cerrarChat(){
    this.modalController.dismiss({
      'mostrarrecorrido': false
    });
  }

}
