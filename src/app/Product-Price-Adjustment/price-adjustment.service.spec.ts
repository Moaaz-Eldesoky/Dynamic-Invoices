import { TestBed } from '@angular/core/testing';

import { PriceAdjustmentService } from './price-adjustment.service';

describe('PriceAdjustmentService', () => {
  let service: PriceAdjustmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceAdjustmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
