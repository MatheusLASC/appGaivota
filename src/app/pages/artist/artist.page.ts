import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, Platform, ToastController} from '@ionic/angular';
import { ArtistService, Artist } from 'src/app/services/artist.service';
import { SocialmediaModalPage } from './socialmedia-modal/socialmedia-modal.page';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
})
export class ArtistPage implements OnInit {

  artists: Artist[] = [];

  newArtist: Artist = {} as Artist;

  // @ViewChild('mylist')mylist: List; -> For Update and Delete


  constructor(
    public modalController: ModalController,
    private artistService: ArtistService,
    private plt: Platform,
    private toastController: ToastController){
      this.plt.ready().then(() => {
        this.loadArtists();
      });
   }

  ngOnInit() {
  }

  addArtist()
  {
    this.newArtist.id = Date.now();
    this.artistService.addItem(this.newArtist).then(artist => {
      this.newArtist = {} as Artist;
      this.showToast('Artista Adicionado');
      this.loadArtists();
    });
  }

  loadArtists()
  {
    this.artistService.getArtists().then(artists => {
      this.artists = artists;
    });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SocialmediaModalPage,
    });
    return await modal.present();
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
