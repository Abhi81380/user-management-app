import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
import { Authservice } from './authservice';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(Authservice);
  const router = inject(Router);

  const role = auth.getRole();

  if (role === 'admin') {
    return true;
  } else {
    router.navigate(['/app-unauthorized']);
    return false;
  }
};
