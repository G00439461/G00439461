import { Injectable } from '@angular/core';

export interface RecipeSearchResult {
  id: number;
  title: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly apiKey = '70759a4f7911402abcc53d3c51d3b759';
  private readonly baseUrl = 'https://api.spoonacular.com';

  async searchRecipesByIngredients(query: string): Promise<RecipeSearchResult[]> {
    const url =
      `${this.baseUrl}/recipes/complexSearch` +
      `?query=${encodeURIComponent(query)}` +
      `&apiKey=${this.apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Spoonacular search failed: ${response.status}`);
    }

    const data = await response.json();
    return (data.results ?? []) as RecipeSearchResult[];
  }
}
