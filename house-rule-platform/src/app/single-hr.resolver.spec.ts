import { TestBed } from '@angular/core/testing';

import { SingleHrResolver } from './single-hr.resolver';

describe('SingleHrResolver', () => {
  let resolver: SingleHrResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SingleHrResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
