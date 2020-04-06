import { TestBed } from '@angular/core/testing';

import { AVControlService } from './a-v-control.service';

describe('AudioControlService', () => {
    let service: AVControlService;

  beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(AVControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
