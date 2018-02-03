import {Organization} from "./organization";

export class Company extends Organization {

  private _dateOfIncorporation:string;

  get dateOfIncorporation(): string {
    return this._dateOfIncorporation;
  }

  set dateOfIncorporation(value: string) {
    this._dateOfIncorporation = value;
  }

}