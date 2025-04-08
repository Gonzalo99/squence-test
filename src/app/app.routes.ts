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
  {
    path: 'artists',
    loadComponent: () => import('./pages/artists/artists.component').then(m => m.ArtistsComponent)
  },
  {
    path: 'record-companies',
    loadComponent: () => import('./pages/record-companies/record-companies.component').then(m => m.RecordCompaniesComponent)
  }
];
