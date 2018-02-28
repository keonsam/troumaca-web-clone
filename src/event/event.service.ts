import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {EventName} from "./event.name";

@Injectable()
export class EventService {

  private _eventName:EventName;

  private subject = new Subject<any>();

  constructor() {
  }

  get eventName(): EventName {
    return this._eventName;
  }

  sendEvent(name:EventName, data: any) {
    this.subject.next({ "name":name, "data":data });
  }

  getEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  sendLoginEvent(data:any) {
    this.subject.next({ "name":EventName.LOGIN, "data":data });
  }

  subscribeToLoginEvent(func) {
    this.subject.subscribe( next => {
      if(next.name === EventName.LOGIN) {
        func(next.data);
      }
    })
  }

  sendSessionExpiredEvent(data:any) {
    this.subject.next({ "name":EventName.SESSION_EXPIRED, "data":data });
  }

  subscribeToSessionExpiredEvent(func) {
    this.subject.subscribe( next => {
      if(next.name === EventName.SESSION_EXPIRED) {
        func(next.data);
      }
    })
  }

  sendSessionLogoutEvent(data:any) {
    this.subject.next({ "name":EventName.LOGOUT, "data":data });
  }

  subscribeToLogoutEvent(func) {
    this.subject.subscribe( next => {
      if(next.name === EventName.LOGOUT) {
        func(next.data);
      }
    })
  }

}
