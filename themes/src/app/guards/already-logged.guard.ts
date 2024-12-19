import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../user/user.service';

export const AlreadyLogged: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const userService = inject(UserService);
    const router = inject(Router);
  
    // If user is not logged in, allow access to the login or register pages
    if (!userService.isLogged) {
      return true;
    }
  
    // If user is logged in, redirect to home page
    router.navigate(['/home']);
    return false;
  };