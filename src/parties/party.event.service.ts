import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class PartyEventService {

  private _menuChangeEvent: EventEmitter<string> = new EventEmitter();

  get menuChangeEvent(): EventEmitter<string> {
    return this._menuChangeEvent;
  }
}