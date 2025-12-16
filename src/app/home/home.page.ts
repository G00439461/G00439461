import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonItem,
  IonInput,
  IonList,
  IonThumbnail,
  IonLabel,
  IonSpinner,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { RecipeService, RecipeSearchResult } from '../services/recipe';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonItem,
    IonInput,
    IonList,
    IonThumbnail,
    IonLabel,
    IonSpinner,
  ],
})
export class HomePage {
  ingredientQuery = '';
  recipes: RecipeSearchResult[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private recipeService: RecipeService) {}

  async onSearch(): Promise<void> {
    this.errorMessage = `CLICKED. Query = "${this.ingredientQuery}"`;

    const q = this.ingredientQuery.trim();
    if (!q) {
      this.recipes = [];
      this.errorMessage = 'Please enter at least one ingredient.';
      return;
    }

    this.isLoading = true;
    try {
      this.recipes = await this.recipeService.searchRecipesByIngredients(q);
    } catch (err: any) {
      this.recipes = [];
      this.errorMessage = `Search failed: ${err?.message ?? err}`;
    } finally {
      this.isLoading = false;
    }
  }
}
