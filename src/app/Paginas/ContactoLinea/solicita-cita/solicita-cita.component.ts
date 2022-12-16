import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-solicita-cita',
  templateUrl: './solicita-cita.component.html',
  styleUrls: ['./solicita-cita.component.scss'],
})
export class SolicitaCitaComponent implements OnInit {

  constructor(
    public modalController: ModalController
    ) { 
      
    }

  ngOnInit() {}

  cerrarChat(){
    this.modalController.dismiss({
      'mostrarrecorrido': false
    });
  }

}
