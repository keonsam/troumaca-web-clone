import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

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

}

export enum EventName {
  LOGIN,
  LOGOUT
}