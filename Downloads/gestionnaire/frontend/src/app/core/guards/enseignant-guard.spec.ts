import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { enseignantGuard } from './enseignant-guard';

describe('enseignantGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => enseignantGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
