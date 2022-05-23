import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface IWord {
  text: string;
  occurence: number;
}

interface IRestaurant {
  name: string;
  description: string;
  logo: string;
}

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private URL = '';

  private restaurant: IRestaurant | undefined = undefined;
  private topTenWords: IWord[] = [];
  loading = false;

  constructor(private httpClient: HttpClient) {}

  private getRestaurantRequest() {
    return this.httpClient.get<IRestaurant>(this.URL);
  }

  public loadRestaurant() {
    this.loading = true;
    this.getRestaurantRequest().subscribe({
      next: (c) => {
        this.setRestaurant(c);
        this.loadTopWords();
        this.loading = false;
      },
      error: () => {
        this.resetTopWords();
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  public loadTopWords() {
    this.resetTopWords();
    if (!this.restaurant) {
      return;
    }
    const words = this.restaurant.description.trim().split(/\s+/);
    const uniqueWords = [...new Set(words)];
    this.topTenWords = uniqueWords
      .map((c) => ({
        text: c,
        occurence: words.filter((x) => c === x).length,
      }))
      .sort((a, b) => b.occurence - a.occurence)
      .slice(0, 10);
  }

  private resetTopWords() {
    this.topTenWords = [];
  }

  public setUrl(url: string) {
    this.URL = url;
  }

  get getRestaurant() {
    return this.restaurant;
  }

  get getTopTenWords() {
    return this.topTenWords;
  }

  public setRestaurant(restaurant: IRestaurant) {
    this.restaurant = restaurant;
  }
}
