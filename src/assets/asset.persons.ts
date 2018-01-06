import {AssetPerson} from "./asset.person";

export class AssetPersons {

  private _persons:AssetPerson[];

  get persons(): AssetPerson[] {
    return this._persons;
  }

  set persons(value: AssetPerson[]) {
    this._persons = value;
  }

}