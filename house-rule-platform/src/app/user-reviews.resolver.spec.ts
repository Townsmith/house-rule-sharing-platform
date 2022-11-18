import { TestBed } from '@angular/core/testing';

import { UserReviewsResolver } from './user-reviews.resolver';

describe('UserReviewsResolver', () => {
  let resolver: UserReviewsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserReviewsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
