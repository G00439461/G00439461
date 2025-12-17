import { TestBed } from '@angular/core/testing';
// [ENH] Unit test tooling. Not usually required unless explicitly requested.

import { FavouritesService } from './favourites';
// [REQ] Favourites is a required feature: add/remove + persist and list favourites. :contentReference[oaicite:7]{index=7}

describe('FavouritesService', () => {
  // [ENH] Basic smoke test: confirms service can be created by Angular DI.
  let service: FavouritesService;

  beforeEach(() => {
    // [ENH] Sets up a testing module context.
    TestBed.configureTestingModule({});

    // [ENH] Inject the service being tested.
    service = TestBed.inject(FavouritesService);
  });

  it('should be created', () => {
    // [ENH] Smoke test – ensures service exists and DI configuration is correct.
    expect(service).toBeTruthy();
  });
});
