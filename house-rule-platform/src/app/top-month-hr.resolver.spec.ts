import { TestBed } from '@angular/core/testing';

import { TopMonthHrResolver } from './top-month-hr.resolver';

describe('TopMonthHrResolver', () => {
  let resolver: TopMonthHrResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TopMonthHrResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
