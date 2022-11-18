import { TestBed } from '@angular/core/testing';

import { UserHrsResolver } from './user-hrs.resolver';

describe('UserHrsResolver', () => {
  let resolver: UserHrsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserHrsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
