import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HqPageRoutingModule } from './hq-routing.module';

import { HqPage } from './hq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HqPageRoutingModule
  ],
  declarations: [HqPage]
})
export class HqPageModule {}
