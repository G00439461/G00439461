import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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

import { FavouritesService, FavouriteRecipe } from '../services/favourites';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
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
  favourites: FavouriteRecipe[] = [];

  constructor(private favouritesService: FavouritesService) {}

  ionViewWillEnter(): void {
    this.favourites = this.favouritesService.getAll();
  }

  remove(id: number): void {
    this.favouritesService.remove(id);
    this.favourites = this.favouritesService.getAll();
  }
}
