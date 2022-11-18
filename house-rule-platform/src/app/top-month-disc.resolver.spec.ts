import { TestBed } from '@angular/core/testing';

import { TopMonthDiscResolver } from './top-month-disc.resolver';

describe('TopMonthDiscResolver', () => {
  let resolver: TopMonthDiscResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TopMonthDiscResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
