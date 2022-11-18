import { TestBed } from '@angular/core/testing';

import { BggUserResolver } from './bgg-user.resolver';

describe('BggUserResolver', () => {
  let resolver: BggUserResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BggUserResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
