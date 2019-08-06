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
          import('./cashier/cashier.module').then(c => c.CashierPageModule)
  },
  // { path: 'ticket', loadChildren: './cashier/modules/ticket/ticket.module#TicketPageModule' },
  // { path: 'tablestatus', loadChildren: './cashier/modules/tablestatus/tablestatus.module#TablestatusPageModule' },
  // { path: 'kitchenque', loadChildren: './cashier/modules/kitchenque/kitchenque.module#KitchenquePageModule' },
  // { path: 'gestusers', loadChildren: './cashier/modules/gestusers/gestusers.module#GestusersPageModule' },
  // { path: 'stats', loadChildren: './cashier/modules/stats/stats.module#StatsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
