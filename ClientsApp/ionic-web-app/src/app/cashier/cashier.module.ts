import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CashierPage } from './cashier.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '1/tablestatus'
  },
  {
    path: '1',
    component: CashierPage,
    children: [
      {
        path: 'tablestatus',
        loadChildren: () => import('./modules/tablestatus/tablestatus.module').then(p => p.TablestatusPageModule)
      },
      {
        path: 'kitchenque',
        loadChildren: () => import('./modules/kitchenque/kitchenque.module').then(p => p.KitchenquePageModule)
      },
      {
        path: 'ticket',
        loadChildren: () => import('./modules/ticket/ticket.module').then(p => p.TicketPageModule)
      },
      {
        path: 'gestusers',
        loadChildren: () => import('./modules/gestusers/gestusers.module').then(p => p.GestusersPageModule)
      },
      {
        path: 'stats',
        loadChildren: () => import('./modules/stats/stats.module').then(p => p.StatsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CashierPage]
})
export class CashierPageModule {}
