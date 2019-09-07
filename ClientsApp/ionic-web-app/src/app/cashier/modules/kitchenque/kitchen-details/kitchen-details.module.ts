import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { KitchenDetailsPage } from './kitchen-details.page';

const routes: Routes = [
  {
    path: '',
    component: KitchenDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [KitchenDetailsPage]
})
export class KitchenDetailsPageModule {}
