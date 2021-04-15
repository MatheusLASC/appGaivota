import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vincularartist-modal',
  templateUrl: './vincularartist-modal.page.html',
  styleUrls: ['./vincularartist-modal.page.scss'],
})
export class VincularartistModalPage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  closeModalHQ(){
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      // tslint:disable-next-line:object-literal-key-quotes
      'dismissed': true
    });
  }
}
