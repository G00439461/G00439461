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

  measurement: 'metric' | 'us' = 'metric';

  constructor() {}

  ionViewWillEnter() {
    const saved = localStorage.getItem('measurement');
    if (saved === 'metric' || saved === 'us') {
      this.measurement = saved;
    }
  }

  onMeasurementChange(event: any) {
    this.measurement = event.detail.value;
    localStorage.setItem('measurement', this.measurement);
  }
}
