import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Artist } from 'src/app/interfaces/artist';
import { ArtistsService } from 'src/app/services/artists.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
})
export class ArtistPage implements OnInit {
  private artistId: string = null;
  public artist: Artist = {};
  private loading: any;
  private artistSubscription: Subscription;


  constructor(
    private artistService: ArtistsService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.artistId = this.activatedRoute.snapshot.params.id;

    if (this.artistId) {
    this.loadArtist();
    }
  }

  ngOnInit() {
  }

    OnDestroy() {
    if (this.artistSubscription) {
      this.artistSubscription.unsubscribe();
     }
  }

  loadArtist() {
    this.artistSubscription = this.artistService.getArtist(this.artistId).subscribe(data => {
      this.artist = data;
    });
  }


  async saveArtist() {
    await this.presentLoading();

    this.artist.userid = (await this.authService.getAuth().currentUser).uid;

    if (this.artistId) {
      try {
        await this.artistService.updateArtist(this.artistId, this.artist);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      try {
        await this.artistService.addArtist(this.artist);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
