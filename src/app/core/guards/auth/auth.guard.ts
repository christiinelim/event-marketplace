import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  const userId = cookieService.get('userId');

  if (userId) {
    return true;
  } else {
    router.navigateByUrl('/login', { state: { error: true, errorMessage: "Please login to access" } });
    return false;
  }
};
