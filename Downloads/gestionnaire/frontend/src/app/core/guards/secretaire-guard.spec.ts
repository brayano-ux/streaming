import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { secretaireGuard } from './secretaire-guard';

describe('secretaireGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => secretaireGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
