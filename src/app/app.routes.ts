import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/store/pages/store-home/store-home').then(m => m.StoreHome)
  },
  {
    path: 'produto/:id',
    loadComponent: () =>
      import('./features/store/pages/product-detail/product-detail').then(m => m.ProductDetail)
  },
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./features/admin/pages/admin-login/admin-login').then(m => m.AdminLogin)
  },
  {
    path: 'admin/dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/pages/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
