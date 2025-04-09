import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/songs', pathMatch: 'full' },
  {
    path: 'songs',
    loadComponent: () => import('./pages/songs/songs.component').then(m => m.SongsComponent),
  },
  {
    path: 'song/:id-song',
    loadComponent: () => import('./pages/songs/song/song.component').then(m => m.SongComponent),
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
