import { CommonModule } from '@angular/common';
// [REQ] Provides Angular directives like *ngIf and *ngFor used in the template
// (results list, error display).

import { FormsModule } from '@angular/forms';
// [REQ] Needed for ngModel two-way binding on the ingredient input field.

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
// [REQ] Ionic standalone imports are required so Ionic tags are recognised
// in the template.

import { RouterLink } from '@angular/router';
// [REQ] RouterLink is needed for navigation to Favourites/Settings
// and Recipe Details page.

import { RecipeService, RecipeSearchResult } from '../services/recipe';
// [REQ] RecipeService handles Spoonacular API calls.
// [REQ] RecipeSearchResult defines the shape of results shown on the Home page list.

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    // [REQ] Core Angular modules for binding and template directives.
    RouterLink,
    CommonModule,
    FormsModule,

    // [REQ] Ionic UI components used in home.page.html.
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
  // [REQ] User input: ingredient(s) to be passed as the Spoonacular `query` parameter.
  ingredientQuery = '';

  // [REQ] Results returned from the API are stored here and displayed in the list.
  recipes: RecipeSearchResult[] = [];

  // [ENH] UX state: shows a spinner while waiting for API response.
  isLoading = false;

  // [REQ] User feedback: validation and API errors are shown on screen.
  errorMessage = '';

  constructor(private recipeService: RecipeService) {}
  // [REQ] Service injection for API search.

  async onSearch(): Promise<void> {
    // [ENH] Clear any previous messages before starting a new search.
    this.errorMessage = '';

    const q = this.ingredientQuery.trim();

    if (!q) {
      // [REQ] Basic validation: don’t call API if user didn’t enter anything.
      this.recipes = [];
      this.errorMessage = 'Please enter at least one ingredient.';
      return;
    }

    this.isLoading = true;

    try {
      // [REQ] Core functionality: call Spoonacular complexSearch
      // using the user-provided ingredient query.
      this.recipes = await this.recipeService.searchRecipesByIngredients(q);
    } catch (err: any) {
      // [REQ] Error handling: show a friendly failure message
      // if the API call fails.
      this.recipes = [];
      this.errorMessage = `Search failed: ${err?.message ?? err}`;
    } finally {
      // [ENH] Always stop the spinner even if the call fails.
      this.isLoading = false;
    }
  }
}
