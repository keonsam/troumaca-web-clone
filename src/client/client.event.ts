import {Subject} from "rxjs/Subject";
import {Injectable} from "@angular/core";
import {EventName} from "./event.name";

@Injectable()
export class ClientEvent {

  private _subject = new Subject<any>();

  constructor() {
  }

  get subject(): Subject<any> {
    return this._subject;
  }

  set subject(value: Subject<any>) {
    this._subject = value;
  }


  sendUnauthorizedEvent(data:any) {
    this._subject.next({name:EventName.UNAUTHORIZED, data:data});
  }

  sendLoginTimeOutEvent(data:any) {
    this._subject.next({name:EventName.LOGIN_TIME_OUT, data:data});
  }

}