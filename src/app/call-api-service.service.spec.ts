import { TestBed } from '@angular/core/testing';

import { CallApiServiceService } from './call-api-service.service';

describe('CallApiServiceService', () => {
  let service: CallApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
