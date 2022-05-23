import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from './services/restaurant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ulventech';

  form = new FormGroup({
    text: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
  });

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {}

  get restaurant() {
    return this.restaurantService.getRestaurant;
  }

  get topWords() {
    return this.restaurantService.getTopTenWords;
  }

  get loading() {
    return this.restaurantService.loading;
  }

  onSubmit(form: FormGroup) {
    this.restaurantService.setUrl(form.value.url);
    this.restaurantService.loadRestaurant();
  }
}
