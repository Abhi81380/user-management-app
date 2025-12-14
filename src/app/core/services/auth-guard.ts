import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from './authservice';
import { Inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {

    const auth = Inject(Authservice);
  const router = Inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
  // return true;
};
function inject(AuthService: any) {
  throw new Error('Function not implemented.');
}

