import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VincularartistModalPage } from './vincularartist-modal/vincularartist-modal.page';

@Component({
  selector: 'app-hq',
  templateUrl: './hq.page.html',
  styleUrls: ['./hq.page.scss'],
})
export class HqPage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: VincularartistModalPage,
    });
    return await modal.present();
  }
}
