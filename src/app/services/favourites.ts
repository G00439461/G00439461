import { Injectable } from '@angular/core';

export interface FavouriteRecipe {
  id: number;
  title: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private readonly storageKey = 'favourites';

  getAll(): FavouriteRecipe[] {
    return this.read();
  }

  isFavourite(id: number): boolean {
    return this.read().some((r) => r.id === id);
  }

  add(recipe: FavouriteRecipe): void {
    const list = this.read();
    if (list.some((r) => r.id === recipe.id)) return;

    list.unshift(recipe); // newest first
    this.write(list);
  }

  remove(id: number): void {
    const list = this.read().filter((r) => r.id !== id);
    this.write(list);
  }

  toggle(recipe: FavouriteRecipe): boolean {
    if (this.isFavourite(recipe.id)) {
      this.remove(recipe.id);
      return false;
    }
    this.add(recipe);
    return true;
  }

  private read(): FavouriteRecipe[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private write(list: FavouriteRecipe[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }
}
