import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { directeurGuard } from './directeur-guard';

describe('directeurGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => directeurGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
