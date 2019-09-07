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
            loadChildren: () =>
              import('./modules/tablestatus/tabledetails/tabledetails.module').then(
                m => m.TabledetailsPageModule
              )
          }
        ]
      },
      {
        path: 'kitchenque',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./modules/kitchenque/kitchenque.module').then(
                m => m.KitchenquePageModule
                )
          },
          {
            path: ':orderID',
            loadChildren: () =>
              import('./modules/kitchenque/kitchen-details/kitchen-details.module').then(
                m => m.KitchenDetailsPageModule
              )
          }
        ]
      },
      {
        path: 'ticket',
        loadChildren: () =>
          import('./modules/ticket/ticket.module').then(m => m.TicketPageModule)
      },
      {
        path: 'gestusers',
        loadChildren: () =>
          import('./modules/gestusers/gestusers.module').then(m => m.GestusersPageModule)
      },
      {
        path: 'stats',
        loadChildren: () =>
          import('./modules/stats/stats.module').then(m => m.StatsPageModule)
      },
      {
        path: 'gestitem',
        loadChildren: () =>
          import('./modules/gestitem/gestitem.module').then(
            m => m.GestitemPageModule
          )
      },
      {
        path: 'gesttable',
        loadChildren: () =>
          import('./modules/gesttable/gesttable.module').then(
            m => m.GesttablePageModule
          )
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
