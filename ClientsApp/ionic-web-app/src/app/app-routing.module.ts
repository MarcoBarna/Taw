import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'users/login', pathMatch: 'full' },
  { path: 'users/login',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      }
    ]
  },
  { path: 'cashier', loadChildren: './cashier/cashier.module#CashierPageModule' }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
