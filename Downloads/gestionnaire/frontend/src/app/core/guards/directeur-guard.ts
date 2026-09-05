import { CanActivateFn } from '@angular/router';

export const directeurGuard: CanActivateFn = (route, state) => {
  return true;
};
