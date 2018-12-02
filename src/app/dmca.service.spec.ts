import { TestBed } from '@angular/core/testing';

import { DmcaService } from './dmca.service';

describe('DmcaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DmcaService = TestBed.get(DmcaService);
    expect(service).toBeTruthy();
  });
});
