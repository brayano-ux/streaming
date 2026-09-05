import { CanActivateFn } from '@angular/router';

export const secretaireGuard: CanActivateFn = (route, state) => {
  return true;
};
