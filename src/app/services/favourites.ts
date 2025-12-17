import { Injectable } from '@angular/core';

/**
 * Represents a minimal recipe object stored as a favourite.
 *
 * [REQ]
 * - The assignment requires the ability to save favourite recipes.
 * - Only lightweight data is stored (id, title, image) rather than the full recipe.
 *   This keeps localStorage small and efficient.
 */
export interface FavouriteRecipe {
  id: number;
  title: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  /**
   * Key used to store favourites in browser localStorage.
   *
   * [REQ]
   * - Persistence of data between sessions is required.
   *
   * [ENH]
   * - Using a constant key avoids typos and makes future changes easier.
   */
  private readonly storageKey = 'favourites';

  /**
   * Returns all favourite recipes.
   *
   * [REQ]
   * - Required so the Favourites page can list all saved recipes.
   */
  getAll(): FavouriteRecipe[] {
    return this.read();
  }

  /**
   * Checks whether a recipe is already marked as favourite.
   *
   * [REQ]
   * - Needed to display correct UI state (e.g. “Add” vs “Remove from favourites”).
   *
   * @param id Recipe id to check
   */
  isFavourite(id: number): boolean {
    return this.read().some((r) => r.id === id);
  }

  /**
   * Adds a recipe to favourites.
   *
   * [REQ]
   * - Core requirement: user must be able to save favourite recipes.
   *
   * [ENH]
   * - Duplicate protection ensures the same recipe is not saved twice.
   * - Newest favourites are added to the top of the list for better UX.
   *
   * @param recipe Recipe to save
   */
  add(recipe: FavouriteRecipe): void {
    const list = this.read();
    if (list.some((r) => r.id === recipe.id)) return;

    list.unshift(recipe); // newest first
    this.write(list);
  }

  /**
   * Removes a recipe from favourites.
   *
   * [REQ]
   * - Required so users can manage and delete favourites.
   *
   * @param id Recipe id to remove
   */
  remove(id: number): void {
    const list = this.read().filter((r) => r.id !== id);
    this.write(list);
  }

  /**
   * Toggles favourite state for a recipe.
   *
   * [ENH]
   * - Combines add/remove logic into a single method.
   * - Simplifies UI code in the Recipe Details page.
   *
   * @param recipe Recipe to toggle
   * @returns true if recipe is now a favourite, false if removed
   */
  toggle(recipe: FavouriteRecipe): boolean {
    if (this.isFavourite(recipe.id)) {
      this.remove(recipe.id);
      return false;
    }
    this.add(recipe);
    return true;
  }

  /**
   * Reads favourites from localStorage.
   *
   * [REQ]
   * - Required for persistence between browser sessions.
   *
   * [ENH]
   * - Wrapped in try/catch to prevent the app from crashing
   *   if localStorage is corrupted or unavailable.
   */
  private read(): FavouriteRecipe[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  /**
   * Writes the favourites list to localStorage.
   *
   * [REQ]
   * - Ensures favourites persist after page reload or browser restart.
   *
   * @param list Updated favourites list
   */
  private write(list: FavouriteRecipe[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }
}
