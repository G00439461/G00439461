import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonButtons,
  IonBackButton,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonList,
  IonItem,
  IonLabel,
  IonImg,
  IonButton,
} from '@ionic/angular/standalone';

import { RecipeService, RecipeDetails } from '../services/recipe';
import { FavouritesService } from '../services/favourites';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonButtons,
    IonBackButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSpinner,
    IonList,
    IonItem,
    IonLabel,
    IonImg,
    IonButton,
  ],
})
export class RecipeDetailsPage {
  recipe: RecipeDetails | null = null;
  isLoading = false;
  errorMessage = '';
  isFav = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private favouritesService: FavouritesService
  ) {}

  async ionViewWillEnter(): Promise<void> {
    this.errorMessage = '';
    this.recipe = null;
    this.isFav = false;

    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!id) {
      this.errorMessage = 'Invalid recipe id.';
      return;
    }

    const units = localStorage.getItem('measurement') === 'us' ? 'us' : 'metric';

    this.isLoading = true;
    try {
      this.recipe = await this.recipeService.getRecipeDetails(id, units);

      // Update favourite state after loading the recipe
      this.isFav = this.favouritesService.isFavourite(this.recipe.id);
    } catch (err: any) {
      this.errorMessage = `Failed to load recipe: ${err?.message ?? err}`;
    } finally {
      this.isLoading = false;
    }
  }

  toggleFavourite(): void {
    if (!this.recipe) return;

    this.isFav = this.favouritesService.toggle({
      id: this.recipe.id,
      title: this.recipe.title,
      image: this.recipe.image,
    });
  }
}
