import { TestBed } from '@angular/core/testing';

import { TouristSpotService } from './tourist-spot.service';

describe('TouristSpotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TouristSpotService = TestBed.get(TouristSpotService);
    expect(service).toBeTruthy();
  });
});
