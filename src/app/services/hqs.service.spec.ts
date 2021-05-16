import { TestBed } from '@angular/core/testing';

import { HqsService } from './hqs.service';

describe('HqsService', () => {
  let service: HqsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HqsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
