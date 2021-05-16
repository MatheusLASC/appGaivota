import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Hq } from 'src/app/interfaces/hq';
import { AuthService } from 'src/app/services/auth.service';
import { HqsService } from 'src/app/services/hqs.service';
import { VincularartistModalPage } from './vincularartist-modal/vincularartist-modal.page';

@Component({
  selector: 'app-hq',
  templateUrl: './hq.page.html',
  styleUrls: ['./hq.page.scss'],
})
export class HqPage implements OnInit {
  private hqId: string = null;
  public hq: Hq = {};
  private loading: any;
  private hqSubscription: Subscription;

  constructor(
    public modalController: ModalController,
    private hqService: HqsService,
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
  }

  loadHq() {
    this.hqSubscription = this.hqService.getHq(this.hqId).subscribe(data => {
      this.hq = data;
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
        await this.hqService.addHq(this.hq);
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


  async openModal() {
    const modal = await this.modalController.create({
      component: VincularartistModalPage,
    });
    return await modal.present();
  }
}
