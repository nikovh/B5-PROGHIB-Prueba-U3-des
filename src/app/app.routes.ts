import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'precio',
    loadComponent: () => import('./precio/precio.page').then( m => m.PrecioPage)
  },
  {
    path: 'precio',
    loadComponent: () => import('./modal/precio/precio.page').then( m => m.PrecioPage)
  },
  {
    path: 'precio-precio',
    loadComponent: () => import('./modal/precio-precio/precio-precio.page').then( m => m.PrecioPrecioPage)
  },
  {
    path: 'precio',
    loadComponent: () => import('./modal/precio/precio.page').then( m => m.PrecioPage)
  },
];
