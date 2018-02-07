import {PersonState} from "./person.state";

export class PersonStates {

  private _persons:PersonState[];

  get persons(): PersonState[] {
    return this._persons;
  }

  set persons(value: PersonState[]) {
    this._persons = value;
  }
}