import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./home/home.module').then(m => m.HomePageModule)
      }
    ]
  },
  {
    path: 'cashier',
    loadChildren: () =>
      import('./cashier/cashier.module').then(m => m.CashierPageModule)
  },
  {
    path: 'tablestatus',
    loadChildren: () =>
      import('./cashier/modules/tablestatus/tablestatus.module').then(
        m => m.TablestatusPageModule
      )
  },
  {
    path: 'ticket',
    loadChildren: () =>
      import('./cashier/modules/ticket/ticket.module').then(
        m => m.TicketPageModule
      )
  },
  {
    path: 'kitchenque',
    loadChildren: () =>
      import('./cashier/modules/kitchenque/kitchenque.module').then(
        m => m.KitchenquePageModule
      )
  },
  {
    path: 'gestusers',
    loadChildren: () =>
      import('./cashier/modules/gestusers/gestusers.module').then(
        m => m.GestusersPageModule
      )
  },
  {
    path: 'stats',
    loadChildren: () =>
      import('./cashier/modules/stats/stats.module').then(
        m => m.StatsPageModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
