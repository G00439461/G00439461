import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonRadioGroup,
  IonRadio
} from '@ionic/angular/standalone';
// [REQ] Ionic standalone imports used in settings.page.html.

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonListHeader,
    IonLabel,
    IonItem,
    IonRadioGroup,
    IonRadio
  ],
})
export class SettingsPage {

  // [REQ] Current measurement choice. Defaults to metric unless user previously saved a preference.
  measurement: 'metric' | 'us' = 'metric';

  constructor() {}
  // [REQ] No dependencies needed here; localStorage is used directly.

  ionViewWillEnter() {
    // [REQ] Load saved preference whenever the Settings page opens.
    // [REQ] Persisted settings are required by the project spec. :contentReference[oaicite:7]{index=7}
    const saved = localStorage.getItem('measurement');

    // [REQ] Only accept expected values (defensive check).
    if (saved === 'metric' || saved === 'us') {
      this.measurement = saved;
    }
  }

  onMeasurementChange(event: any) {
    // [REQ] Update local value from the radio group selection.
    this.measurement = event.detail.value;

    // [REQ] Persist the user choice so Recipe Details can use it later.
    localStorage.setItem('measurement', this.measurement);
  }
}
