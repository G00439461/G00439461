import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface RecipeSearchResult {
  id: number;
  title: string;
  image: string;
}

export interface RecipeIngredient {
  name: string;
  amount: number;
  unit: string;
}

export interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  instructions?: string;
  extendedIngredients: RecipeIngredient[];
  steps: string[]; // ✅ new: numbered steps
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

    const data = await firstValueFrom(this.http.get<any>(url));
    return (data.results ?? []) as RecipeSearchResult[];
  }

  async getRecipeDetails(id: number, units: 'metric' | 'us'): Promise<RecipeDetails> {
    const url =
      `${this.baseUrl}/recipes/${id}/information` +
      `?includeNutrition=false` +
      `&units=${units}` +
      `&apiKey=${this.apiKey}`;

    const data = await firstValueFrom(this.http.get<any>(url));

    const ingredients: RecipeIngredient[] = (data.extendedIngredients ?? []).map((i: any) => ({
      name: i.name,
      amount: i.measures?.[units]?.amount ?? i.amount ?? 0,
      unit: i.measures?.[units]?.unitShort ?? i.unit ?? '',
    }));

    const steps: string[] =
      (data.analyzedInstructions?.[0]?.steps ?? []).map((s: any) => s.step);

    return {
      id: data.id,
      title: data.title,
      image: data.image,
      instructions: data.instructions,
      extendedIngredients: ingredients,
      steps,
    };
  }
}
