import { Component, OnInit } from '@angular/core';
import {AuxilioRapidoComponent} from '../../../Paginas/auxilio-rapido/auxilio-rapido.component';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-registro',
  templateUrl: './pre-registro.component.html',
  styleUrls: ['./pre-registro.component.scss'],
})
export class PreRegistroComponent implements OnInit {

  constructor(private modalController : ModalController,private router: Router) { }

  ngOnInit() {}

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

  regresar(){
    this.router.navigateByUrl('login', { replaceUrl: true });

  }

  registrarPersonNatural(){
    this.router.navigateByUrl('registro', { replaceUrl: true });
  }

  registraPersonaJuridica(){
    this.router.navigateByUrl('registrojuridica', { replaceUrl: true });
  }

}
