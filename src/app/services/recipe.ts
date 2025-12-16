import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  async searchRecipesByIngredients(query: string): Promise<RecipeSearchResult[]> {
    const url =
      `${this.baseUrl}/recipes/complexSearch` +
      `?query=${encodeURIComponent(query)}` +
      `&apiKey=${this.apiKey}`;

    const response$ = this.http.get<any>(url);
    const data = await firstValueFrom(response$);

    return (data.results ?? []) as RecipeSearchResult[];
  }
}
