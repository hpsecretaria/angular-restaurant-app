import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RestaurantService } from './restaurant.service';

describe('RestaurantService', () => {
  let service: RestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RestaurantService);
  });

  it('it should return word and occurence list', () => {
    service.setRestaurant({
      name: 'Test',
      description: 'Test Test NewTest',
      logo: '',
    });
    service.loadTopWords();
    expect(service.getTopTenWords.length).toBeGreaterThan(1);
    expect(service.getTopTenWords).toHaveSize(2);
    expect(
      service.getTopTenWords.filter((c) => c.text === 'Test')[0].occurence
    ).toEqual(2);
    expect(
      service.getTopTenWords.filter((c) => c.text === 'NewTest')[0].occurence
    ).toEqual(1);
  });
});
