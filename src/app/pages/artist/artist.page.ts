import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SocialmediaModalPage } from '../socialmedia-modal/socialmedia-modal.page';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
})
export class ArtistPage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: SocialmediaModalPage,
    });
    return await modal.present();
  }

}