import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
    /**
     * Constructor
     */

    constructor(private _router: Router, private toast: ToastrService) {}

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.url.includes('/login')) {
            const token = localStorage.getItem('token')
            if (!token ||token === null) {
                localStorage.clear()
                this._router.navigate(['/auth/sign-in'])
            }
          if (token) {
            request = request.clone({
              headers: request.headers.set('Authorization', `Bearer ${token}`),
            });
          }
        }
        return  next.handle(request).pipe(
          catchError((error) => {
              if (
                  error instanceof HttpErrorResponse &&
                  error.status === 403
              ) {
                  this.toast.error('Sem permissão para modificações');
                  localStorage.clear()
                  this._router.navigate(['/auth/sign-in']);
              }
              return throwError(error);
          })
        )
    }
}
