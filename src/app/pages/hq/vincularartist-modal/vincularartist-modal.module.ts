import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VincularartistModalPageRoutingModule } from './vincularartist-modal-routing.module';

import { VincularartistModalPage } from './vincularartist-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VincularartistModalPageRoutingModule
  ],
  declarations: [VincularartistModalPage]
})
export class VincularartistModalPageModule {}
