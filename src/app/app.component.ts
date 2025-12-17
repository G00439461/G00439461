import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterLink } from '@angular/router';
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
=======
import { IonApp, IonRouterOutlet, IonFooter, IonToolbar, IonTitle } from '@ionic/angular/standalone';
>>>>>>> e2ba967e4ddb35dce3395296bae940b35cab8d81

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
<<<<<<< HEAD
  imports: [
    IonApp,
    IonRouterOutlet,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    RouterLink,
  ],
=======
  imports: [IonApp, IonRouterOutlet, IonFooter, IonToolbar, IonTitle],
>>>>>>> e2ba967e4ddb35dce3395296bae940b35cab8d81
})
export class AppComponent {}
