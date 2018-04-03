import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import 'rxjs/add/operator/do';
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {ClientEvent} from "./client.event";

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(private clientEvent:ClientEvent) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true
    });
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
    return next.handle(req).catch( x => this.handleError(x));
  }

  handleEvent(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      // do stuff with response if you want
    }
  }

  handleError(err:any): Observable<any>{
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        // redirect to the login route or show a modal
        this.clientEvent.sendUnauthorizedEvent({"unauthorized":true});
      } else if (err.status === 440) {
        this.clientEvent.sendLoginTimeOutEvent({"loginTimeOut":true});
      }
      return Observable.of(err.message);
    }
    return Observable.throw(err);
  }

}
