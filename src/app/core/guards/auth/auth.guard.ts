import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

export const authGuard: CanActivateFn = async (route, state) => {
  const firebaseAuth = inject(Auth);
  const router = inject(Router);

  const user = await firebaseAuth.currentUser;
  // const isLoggedIn = !!user;
  const isLoggedIn = true;
  
  if (isLoggedIn) {
    return isLoggedIn
  } else {
    router.navigateByUrl('/login', { state: { error: true, errorMessage: "Please login to access" } });
    return isLoggedIn
  }
};
