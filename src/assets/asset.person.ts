export class AssetPerson {

  private _partyId:string;
  private _name: string;
  private _firstName:string;
  private _middleName:string;
  private _lastName: string;
  private _birthDate:Date;

  /*constructor(partyId?:string, firstName?:string, middleName?:string, lastName?: string, birthDate?: Date){
    this._partyId = partyId;
    this._firstName = firstName;
    this._middleName = middleName;
    this._lastName = lastName;
    this._birthDate = birthDate;
  } */

  get partyId(): string {
    return this._partyId;
  }

  set partyId(value: string) {
    this._partyId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get middleName(): string {
    return this._middleName;
  }

  set middleName(value: string) {
    this._middleName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get birthDate(): Date {
    return this._birthDate;
  }

  set birthDate(value: Date) {
    this._birthDate = value;
  }

}
