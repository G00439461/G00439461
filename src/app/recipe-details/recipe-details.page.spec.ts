import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonList,
  IonItem,
  IonLabel,
  IonImg,
} from '@ionic/angular/standalone';
import { RecipeService, RecipeDetails } from '../services/recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: 'recipe-details.page.html',
  styleUrls: ['recipe-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSpinner,
    IonList,
    IonItem,
    IonLabel,
    IonImg,
  ],
})
export class RecipeDetailsPage {
  recipeId = 0;
  recipe: RecipeDetails | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  async ionViewWillEnter(): Promise<void> {
    this.errorMessage = '';
    this.recipe = null;

    const idParam = this.route.snapshot.paramMap.get('id');
    this.recipeId = Number(idParam);

    if (!this.recipeId) {
      this.errorMessage = 'Invalid recipe id.';
      return;
    }

    const units = (localStorage.getItem('measurement') === 'us') ? 'us' : 'metric';

    this.isLoading = true;
    try {
      this.recipe = await this.recipeService.getRecipeDetails(this.recipeId, units);
    } catch (err: any) {
      this.errorMessage = `Failed to load recipe: ${err?.message ?? err}`;
    } finally {
      this.isLoading = false;
    }
  }
}
