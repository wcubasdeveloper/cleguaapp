import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from '../../../services/photo.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  constructor(public modalController: ModalController, public photoService: PhotoService) { }

  ngOnInit() {}


  cerrarChat(){
    this.modalController.dismiss({
      'mostrarrecorrido': false
    });
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
  

}
