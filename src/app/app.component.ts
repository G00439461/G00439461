import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonFooter, IonToolbar, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonFooter, IonToolbar, IonTitle],
})
export class AppComponent {}
