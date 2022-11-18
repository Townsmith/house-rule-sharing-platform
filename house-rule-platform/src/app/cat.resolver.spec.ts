import { TestBed } from '@angular/core/testing';

import { CatResolver } from './cat.resolver';

describe('CatResolver', () => {
  let resolver: CatResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CatResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
