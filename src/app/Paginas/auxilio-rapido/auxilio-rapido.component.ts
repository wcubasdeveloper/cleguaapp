import { Component, OnInit  } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';


@Component({
  selector: 'app-auxilio-rapido',
  templateUrl: './auxilio-rapido.component.html',
  styleUrls: ['./auxilio-rapido.component.scss'],
})
export class AuxilioRapidoComponent implements OnInit {

  public numeroEmergenciaSerenazgo : any;
  constructor(public modalController: ModalController,private callNumber: CallNumber) { 
    this.numeroEmergenciaSerenazgo = "014523897";
  }

  ngOnInit() {
    this.numeroEmergenciaSerenazgo = "014523897";


  }

  cancel() {
    this.modalController.dismiss({
      'mostrarrecorrido': false
    });
  }

  confirm() {

  }

  llamarEmergencia(numero : any){
    this.callNumber.callNumber(numero, true)
    .then(res => {
      
    })
    .catch(err => console.log('Error launching dialer', err));
  }

  cerrarModal(){
    this.modalController.dismiss({
      'mostrarrecorrido': false
    });
  }

 

}
