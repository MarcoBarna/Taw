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
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./cashier/modules/tablestatus/tablestatus.module').then(
            m => m.TablestatusPageModule
          )
      },
      {
        path: ':tableId',
        loadChildren: () =>
          import('./cashier/modules/tablestatus/tabledetails/tabledetails.module').then(
            m => m.TabledetailsPageModule
          )
      }
    ]
  },
  {
    path: 'ticket',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./cashier/modules/ticket/ticket.module').then(
            m => m.TicketPageModule
        )
      },
      {
        path: ':orderID',
        loadChildren: () =>
          import('./cashier/modules/ticket/ticket-details/ticket-details.module').then(
            m => m.TicketDetailsPageModule
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
          import('./cashier/modules/kitchenque/kitchenque.module').then(
            m => m.KitchenquePageModule
          )
      },
      {
        path: ':orderID',
        loadChildren: () =>
          import('./cashier/modules/kitchenque/kitchen-details/kitchen-details.module').then(
            m => m.KitchenDetailsPageModule
          )
      }
    ]
  },
  {
    path: 'gestusers',
    loadChildren: () =>
      import('./cashier/modules/gestusers/gestusers.module').then(
        m => m.GestusersPageModule
      )
  },
  {
    path: 'gestitem',
    loadChildren: () =>
      import('./cashier/modules/gestitem/gestitem.module').then(
        m => m.GestitemPageModule
      )
  },
  {
    path: 'gesttable',
    loadChildren: () =>
      import('./cashier/modules/gesttable/gesttable.module').then(
        m => m.GesttablePageModule
      )
  },
  {
    path: 'stats',
    loadChildren: () =>
      import('./cashier/modules/stats/stats.module').then(
        m => m.StatsPageModule
      )
  },
  {
    path: 'waiter',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./waiter/waiter.module').then(
            m => m.WaiterPageModule
          )
      },
      {
        path: ':tableId',
        loadChildren: () =>
          import('./waiter/modules/waiter-order/waiter-order.module').then(
            m => m.WaiterOrderPageModule
          )
      }
    ]
  },
  {
    path: 'cook',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./cook/cook.module').then(
            m => m.CookPageModule
          )
      },
      {
        path: ':orderID',
        loadChildren: () =>
          import('./cook/cook-details/cook-details.module').then(
            m => m.CookDetailsPageModule
          )
      }
    ]
  },
  {
    path: 'bartender',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./bartender/bartender.module').then(
            m => m.BartenderPageModule
          )
      },
      {
        path: ':orderID',
        loadChildren: () =>
          import('./bartender/bartender-details/bartender-details.module').then(
            m => m.BartenderDetailsPageModule
          )
      }
    ]
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
