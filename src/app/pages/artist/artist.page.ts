import { Component, OnInit} from '@angular/core';
import { ModalController, Platform, ToastController} from '@ionic/angular';
import { ArtistService, Artist } from 'src/app/services/artist.service';
import { SocialmediaModalPage } from './socialmedia-modal/socialmedia-modal.page';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
})
export class ArtistPage implements OnInit {

  artists: Artist[] = [];

  newArtist: Artist = {} as Artist;

  /*
  public errorMessages = {
    name: [
      { type: 'required', message: 'Preencha o Nome' },
    ],
    nameArtist: [
      { type: 'required', message: 'Preencha o Nome Artístico' },
    ],
    CPF: [
      { type: 'required', message: 'Preencha o CPF' },
    ],
    city: [
      { type: 'required', message: 'Preencha a Cidade' },
    ],
    state: [
      { type: 'required', message: 'Preencha o Estado' },
    ],
    biography: [
      { type: 'required', message: 'Preencha a Mini-Biografia' },
    ]
  };
*/

  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    nameArtist: ['', [Validators.required]],
    CPF: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    biography: ['', [Validators.required]],
  });


  // @ViewChild('mylist')mylist: List; -> For Update and Delete

  get name() {
    return this.registrationForm.get('name');
  }
  get nameArtist() {
    return this.registrationForm.get('nameArtist');
  }
  get CPF() {
    return this.registrationForm.get('CPF');
  }
  get city() {
    return this.registrationForm.get('city');
  }
  get state() {
    return this.registrationForm.get('state');
  }
  get biography() {
    return this.registrationForm.get('biography');
  }

  constructor(
    private formBuilder: FormBuilder,
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
