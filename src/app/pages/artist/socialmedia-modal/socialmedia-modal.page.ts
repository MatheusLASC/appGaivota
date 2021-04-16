import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-socialmedia-modal',
  templateUrl: './socialmedia-modal.page.html',
  styleUrls: ['./socialmedia-modal.page.scss'],
})
export class SocialmediaModalPage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  closeModalArtist(){
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      // tslint:disable-next-line:object-literal-key-quotes
      'dismissed': true
    });
  }
}
