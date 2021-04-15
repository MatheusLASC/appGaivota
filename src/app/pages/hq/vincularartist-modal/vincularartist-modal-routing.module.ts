import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VincularartistModalPage } from './vincularartist-modal.page';

const routes: Routes = [
  {
    path: '',
    component: VincularartistModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VincularartistModalPageRoutingModule {}
