import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'recipe/:id',
  loadComponent: () =>
    import('./recipe-details/recipe-details.page').then((m) => m.RecipeDetailsPage),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: 'favourites',
    loadComponent: () =>
      import('./favourites/favourites.page').then((m) => m.FavouritesPage),
  },
];
