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
    path: 'terms',
    loadChildren: () =>
      import('./terms/terms.module').then(m => m.TermsPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () =>
      import('./privacy/privacy.module').then(m => m.PrivacyPageModule)
  },
  {
    path: 'qr-code-order',
    loadChildren: () =>
      import('./qr-code-order/qr-code-order.module').then(m => m.QrCodeOrderPageModule)
  },
  {
    path: 'list-order',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./list-order/list-order.module').then(m => m.ListOrderPageModule)
      },
      {
        path: ':tableID',
        loadChildren: () =>
          import('./list-order/newlist-order/newlist-order.module').then(m => m.NewlistOrderPageModule)
      }
    ]
  },
  {
    path: 'prepay/:orderid',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./prepay/prepay.module').then(m => m.PrepayPageModule)
      },
      {
        path: 'card',
        loadChildren: () =>
          import('./prepay/card-pay/card-pay.module').then(m => m.CardPayPageModule)
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
