import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialmediaModalPage } from './socialmedia-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SocialmediaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialmediaModalPageRoutingModule {}
