import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {ClientEvent} from "./client.event";

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(private clientEvent:ClientEvent) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return next.handle(req).do((event: HttpEvent<any>) => {
    //   if (event instanceof HttpResponse) {
    //     // do stuff with response if you want
    //   }
    // }, (err: any) => {
    //   if (err instanceof HttpErrorResponse) {
    //     if (err.status === 401) {
    //       // redirect to the login route or show a modal
    //       this.clientEvent.sendUnauthorizedEvent({"unauthorized":true});
    //     } else if (err.status === 440) {
    //       this.clientEvent.sendLoginTimeOutEvent({"loginTimeOut":true});
    //     }
    //   }
    // });
    return next.handle(req).do(this.handleEvent, this.handleError);
  }

  handleEvent(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      // do stuff with response if you want
    }
  }

  handleError(err:any) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        // redirect to the login route or show a modal
        this.clientEvent.sendUnauthorizedEvent({"unauthorized":true});
      } else if (err.status === 440) {
        this.clientEvent.sendLoginTimeOutEvent({"loginTimeOut":true});
      }
    }
  }

}