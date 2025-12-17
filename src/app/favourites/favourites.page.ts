import { CommonModule } from '@angular/common';
// [REQ] Provides template directives like *ngIf and *ngFor used in the HTML list.

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// [REQ] RouterLink used to navigate from favourites list to recipe details.

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonButton,
} from '@ionic/angular/standalone';
// [REQ] Ionic standalone imports so Ionic components in the template are recognised.

import { FavouritesService, FavouriteRecipe } from '../services/favourites';
// [REQ] Core requirement: favourites must persist and be retrievable/displayed. :contentReference[oaicite:4]{index=4}
  // FavouriteRecipe is the lightweight model used for list display.

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,

    // [REQ] Ionic UI building blocks for this page.
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonButton,
  ],
})
export class FavouritesPage {
  // [REQ] Local list shown in the UI; fetched from favourites service.
  favourites: FavouriteRecipe[] = [];

  constructor(private favouritesService: FavouritesService) {}
  // [REQ] Inject favourites service to load and update favourites.

  ionViewWillEnter(): void {
    // [REQ] Ionic lifecycle hook: runs each time the page is about to be shown.
    // [REQ] Ensures favourites list is always up-to-date after additions/removals.
    this.favourites = this.favouritesService.getAll();
  }

  remove(id: number): void {
    // [REQ] Remove a favourite from storage.
    this.favouritesService.remove(id);

    // [REQ] Refresh the list immediately so the UI updates without needing a reload.
    this.favourites = this.favouritesService.getAll();
  }
}
