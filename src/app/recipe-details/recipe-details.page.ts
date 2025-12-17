import { CommonModule } from '@angular/common';
// [REQ] Enables structural directives used in the template (*ngIf, *ngFor).

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// [REQ] Used to read the :id from the route (recipe/:id).

import {
  IonHeader,
  IonToast,
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
// [REQ] Ionic standalone imports used in this page’s template.

import { RecipeService, RecipeDetails } from '../services/recipe';
// [REQ] RecipeService provides API calls to load recipe information by ID. :contentReference[oaicite:12]{index=12}

import { FavouritesService } from '../services/favourites';
// [REQ] Favourites persistence and add/remove capability. :contentReference[oaicite:13]{index=13}

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
    IonToast, // needed because we use <ion-toast> in the HTML
    // [ENH] Toast is UX polish to provide immediate feedback.
  ],
})
export class RecipeDetailsPage {
  // [REQ] Loaded recipe model for the details page.
  recipe: RecipeDetails | null = null;

  // [ENH] UX states for loading and displaying errors.
  isLoading = false;
  errorMessage = '';

  // [REQ] Track whether current recipe is already favourited.
  isFav = false;

  // track which units are being used
  // [REQ] Must reflect the Settings selection (metric/us) and be used when mapping ingredients.
  units: 'metric' | 'us' = 'metric';

  // Toast state
  // [ENH] Toast improves UX for add/remove favourites.
  toastOpen = false;
  toastMessage = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private favouritesService: FavouritesService
  ) {}
  // [REQ] Dependencies: route for :id, recipe service for API, favourites for persistence.

  async ionViewWillEnter(): Promise<void> {
    // [REQ] Reset view state each time the page becomes active.
    this.errorMessage = '';
    this.recipe = null;
    this.isFav = false;

    // [REQ] Read and validate recipe ID from route.
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!id) {
      // [REQ] Handle invalid/empty ids safely.
      this.errorMessage = 'Invalid recipe id.';
      return;
    }

    // [REQ] Load units setting from localStorage (saved by Settings page).
    this.units = localStorage.getItem('measurement') === 'us' ? 'us' : 'metric';

    this.isLoading = true;
    try {
      // [REQ] Load recipe information by ID using Spoonacular API call in RecipeService.
      this.recipe = await this.recipeService.getRecipeDetails(id, this.units);

      // [REQ] After loading recipe, check if it is already favourited.
      this.isFav = this.favouritesService.isFavourite(this.recipe.id);
    } catch (err: any) {
      // [REQ] User-friendly error output if API fails.
      this.errorMessage = `Failed to load recipe: ${err?.message ?? err}`;
    } finally {
      // [ENH] Always stop the spinner.
      this.isLoading = false;
    }
  }

  toggleFavourite(): void {
    // [REQ] Required behaviour: add/remove favourite on user action.
    if (!this.recipe) return;

    // [REQ] Toggle favourite in storage.
    const nowFav = this.favouritesService.toggle({
      id: this.recipe.id,
      title: this.recipe.title,
      image: this.recipe.image,
    });

    // [REQ] Update UI state to match storage state.
    this.isFav = nowFav;

    // Toast feedback
    // [ENH] Immediate feedback for user action improves overall usability.
    this.toastMessage = nowFav ? 'Added to favourites' : 'Removed from favourites';
    this.toastOpen = true;
  }
}
