import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HqPage } from './hq.page';

const routes: Routes = [
  {
    path: '',
    component: HqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HqPageRoutingModule {}
