import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// [REQ] RouterLink enables navigation buttons to Home/Favourites/Settings.

import {
  IonApp,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
// [REQ] These imports are required in Angular standalone so Ionic elements are recognised in HTML.
// [ENH] Having a consistent header across all pages improves usability and presentation.

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    // [REQ] Base Ionic app container + outlet where routed pages render.
    IonApp,
    IonRouterOutlet,

    // [ENH] Global header (branding + navigation) is an enhancement beyond the required per-page header.
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,

    // [REQ] Needed for routerLink usage in the global header buttons.
    RouterLink,
  ],
})
export class AppComponent {}
// [REQ] Root component is required for any Angular/Ionic app.
// [ENH] Your global header strategy is an enhancement: it standardises navigation and branding.
