import { TestBed } from '@angular/core/testing';

import { HrResolver } from './hr.resolver';

describe('HrResolver', () => {
  let resolver: HrResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(HrResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
