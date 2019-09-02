import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BartenderDetailsPage } from './bartender-details.page';

const routes: Routes = [
  {
    path: '',
    component: BartenderDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BartenderDetailsPage]
})
export class BartenderDetailsPageModule {}
