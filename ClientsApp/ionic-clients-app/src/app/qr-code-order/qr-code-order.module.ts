import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QrCodeOrderPage } from './qr-code-order.page';

const routes: Routes = [
  {
    path: '',
    component: QrCodeOrderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QrCodeOrderPage]
})
export class QrCodeOrderPageModule {}
