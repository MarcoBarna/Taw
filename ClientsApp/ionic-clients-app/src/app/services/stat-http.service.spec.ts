import { TestBed } from '@angular/core/testing';

import { StatHttpService } from './stat-http.service';

describe('StatHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatHttpService = TestBed.get(StatHttpService);
    expect(service).toBeTruthy();
  });
});
