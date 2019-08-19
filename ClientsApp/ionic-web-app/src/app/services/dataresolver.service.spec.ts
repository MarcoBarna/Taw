import { TestBed } from '@angular/core/testing';

import { DataresolverService } from './dataresolver.service';

describe('DataresolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataresolverService = TestBed.get(DataresolverService);
    expect(service).toBeTruthy();
  });
});
