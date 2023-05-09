import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/features/user/services';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
  ) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.GetToken();
	const access = token ? token.access : null;

    if (access && (!httpRequest.url.includes('/authentication/'))) {
      httpRequest = httpRequest.clone({
        setHeaders: {
          Authorization: 'Bearer ' + access,
        },
        withCredentials: false, // send cookies
      });
    }

    return next.handle(httpRequest).pipe(
      map((res) => res),
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            // Handle unauthorized error
            // console.log("Unauthorized");
            // logout() user
          } else if (err.status === 500) {
            // Handler internal server error
            // console.log("Server is not responding.")
            // alert("Try after some time.")
          }
          // ......
        }

        return throwError(() => err);
      })
    );
  }
}