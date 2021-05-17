import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Artistcheck } from 'src/app/interfaces/artist';
import { Hq } from 'src/app/interfaces/hq';
import { ArtistsService } from 'src/app/services/artists.service';
import { AuthService } from 'src/app/services/auth.service';
import { HqsService } from 'src/app/services/hqs.service';

@Component({
  selector: 'app-hq',
  templateUrl: './hq.page.html',
  styleUrls: ['./hq.page.scss'],
})
export class HqPage implements OnInit {
  private hqId: string = null;
  public hq: Hq = {};
  public artists = new Array<Artistcheck>();
  private loading: any;
  private hqSubscription: Subscription;
  private artistsSubscription: Subscription;

  constructor(
    private hqService: HqsService,
    private artistService: ArtistsService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.hqId = this.activatedRoute.snapshot.params.id;

    if (this.hqId) {
    this.loadHq();
    }
   }

  ngOnInit() {
    this.loadArtists();
  }

  OnDestroy() {
    this.artistsSubscription.unsubscribe();
    this.hqSubscription.unsubscribe();
  }

  loadHq() {
    this.hqSubscription = this.hqService.getHq(this.hqId).subscribe(data => {
      this.hq = data;
    });
  }

  loadArtists()
  {
    this.artistsSubscription = this.artistService.getArtists().subscribe(data => {
      this.artists = data;
    });
  }



  async saveHq() {
    await this.presentLoading();

    this.hq.userid = (await this.authService.getAuth().currentUser).uid;

    if (this.hqId) {
      try {
        await this.hqService.updateHq(this.hqId, this.hq);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      try {
        this.hq.idartists = [];
        this.artists.forEach(artist => {
          if (artist.check)
          {
              this.hq.idartists.push(artist.id);
          }
        });
        await this.hqService.addHq(this.hq);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list');
      } catch (error) {
        console.log(error);
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
