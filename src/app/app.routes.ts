import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/songs', pathMatch: 'full' },
  {
    path: 'songs',
    loadComponent: () => import('./pages/songs/songs.component').then(m => m.SongsComponent),
    // children: [
    //   {
    //     path: ':id-song',
    //     loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent)
    //   }
    // ]
  },
  // {
  //   path: 'artists',
  //   loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  // },
  // {
  //   path: 'record-companies',
  //   loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  // }
];
