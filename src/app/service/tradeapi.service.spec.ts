import { TestBed } from '@angular/core/testing';

import { TradeapiService } from './tradeapi.service';

describe('TradeapiService', () => {
  let service: TradeapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
