import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtistPageRoutingModule } from './artist-routing.module';

import { ArtistPage } from './artist.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ArtistPageRoutingModule
  ],
  declarations: [ArtistPage]
})
export class ArtistPageModule {}
