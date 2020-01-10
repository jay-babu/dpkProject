import { TestBed } from '@angular/core/testing';

import { DriveAPIService } from './drive-api.service';

describe('DriveAPIService', () => {
  let service: DriveAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriveAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
