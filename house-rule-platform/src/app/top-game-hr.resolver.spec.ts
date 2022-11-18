import { TestBed } from '@angular/core/testing';

import { TopGameHrResolver } from './top-game-hr.resolver';

describe('TopGameHrResolver', () => {
  let resolver: TopGameHrResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TopGameHrResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
