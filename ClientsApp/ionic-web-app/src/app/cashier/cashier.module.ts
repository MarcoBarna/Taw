import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CashierPage } from './cashier.page';

const routes: Routes = [

  { path: '', redirectTo: 'menu/tablestatus', pathMatch: 'full' },
  {
    path: 'menu',
    children: [
      {
        path: 'tablestatus',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./modules/tablestatus/tablestatus.module').then(
                m => m.TablestatusPageModule
              )
          },
          {
            path: ':tableId',
            loadChildren: ()=>
              import('./modules/tablestatus/tabledetails/tabledetails.module').then(
                m => m.TabledetailsPageModule
              )
          }
        ]
      },
      {
        path: 'kitchenque',
        loadChildren: () =>
          import('./modules/kitchenque/kitchenque.module').then(kitch => kitch.KitchenquePageModule)
      },
      {
        path: 'ticket',
        loadChildren: () =>
          import('./modules/ticket/ticket.module').then(ticket => ticket.TicketPageModule)
      },
      {
        path: 'gestusers',
        loadChildren: () =>
          import('./modules/gestusers/gestusers.module').then(gestusr => gestusr.GestusersPageModule)
      },
      {
        path: 'stats',
        loadChildren: () =>
          import('./modules/stats/stats.module').then(stats => stats.StatsPageModule)
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
