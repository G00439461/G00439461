import { provideHttpClient } from '@angular/common/http'; 
// [REQ] Required for calling Spoonacular via Angular HttpClient in your services.

import { bootstrapApplication } from '@angular/platform-browser';
// [REQ] Angular standalone bootstrapping (no AppModule).

import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
// [REQ] Routing is needed for multi-page app: Home, Settings, Favourites, Recipe Details.

import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
// [REQ] Required Ionic setup for Angular standalone apps.

import { addIcons } from 'ionicons';
import { heartOutline, settingsOutline } from 'ionicons/icons';
// [REQ] The brief requires favourites + settings icons accessible from the Home page header.
// [ENH] Using icons (instead of plain text links) improves UX / presentation.

import { routes } from './app/app.routes';
// [REQ] Central navigation config: must support Home, Settings, Favourites, and Details routes.

import { AppComponent } from './app/app.component';
// [REQ] Root component for the Ionic app.

// Register the icons we use in the app.
// [REQ] Heart + settings icons are required for navigation (favourites/settings entry points).
addIcons({ heartOutline, settingsOutline });

bootstrapApplication(AppComponent, {
  providers: [
    // [REQ] Allows services to make HTTP calls (Spoonacular API).
    provideHttpClient(),

    // [REQ] Ionic router strategy ensures Ionic navigation behaves correctly.
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // [REQ] Enables Ionic components and styling in an Angular standalone project.
    provideIonicAngular(),

    // [REQ] App routes (Home, Details, Favourites, Settings). Preloading improves perceived speed.
    // [ENH] Preloading is not strictly required, but makes navigation feel faster (better UX).
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
