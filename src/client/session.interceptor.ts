import {throwError as observableThrowError, Observable, of} from 'rxjs';
import { catchError } from "rxjs/operators";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ClientEvent} from './client.event';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(private clientEvent: ClientEvent) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true
    });
    return next.handle(req).pipe(catchError( x => this.handleError(x)));
  }

  handleEvent(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      // do stuff with response if you want
    }
  }

  handleError(err: any): Observable<any> {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        // redirect to the login route or show a modal
        this.clientEvent.sendUnauthorizedEvent({'unauthorized': true});
      } else if (err.status === 440) {
        this.clientEvent.sendLoginTimeOutEvent({'loginTimeOut': true});
      }
      return of(err.message);
    }
    return observableThrowError(err);
  }

}
