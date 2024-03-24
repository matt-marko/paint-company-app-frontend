import { TestBed } from '@angular/core/testing';

import { PaintStockService } from './paint-stock.service';

describe('PaintStockService', () => {
  let service: PaintStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaintStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
