import { TestBed } from '@angular/core/testing';

import { SlideConfigService } from './slide-config.service';

describe('SlideConfigService', () => {
  let service: SlideConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlideConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
