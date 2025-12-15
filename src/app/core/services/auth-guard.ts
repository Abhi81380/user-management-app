import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from './authservice';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {

    const auth = inject(Authservice);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
  // return true;
};
// function inject(AuthService: any) {
//   throw new Error('Function not implemented.');
// }

