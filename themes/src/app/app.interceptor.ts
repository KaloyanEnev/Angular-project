import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
// import { ErrorMessageService } from './core/error-message/error-message.service';
import { Router } from '@angular/router';

const { apiUrl } = environment;

const API = '/api';
export const appInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiUrl),
      withCredentials:true
    });
  }
  // const errorMessageService = inject(ErrorMessageService);
  // OLD WAS JUST return next(req) before adding error hanling
  console.log(req);
  
  return next(req)
  // .pipe(
  //   catchError((error) => {
  //     // Check if it's a server-side error
  //     if (error.status === 401) {
  //       console.error('Invalid credentials:', error.error.message || error.message);
  //     }
  //     // Pass the error to the component by re-throwing it
  //     return throwError(() => error);
  //   })
  // );
   
 
  
};
