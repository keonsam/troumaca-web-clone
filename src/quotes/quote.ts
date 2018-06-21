export class Quote {

  private _firstName: string;
  private _lastName: string;
  private _companyName: string;
  private _phoneNumber: string;
  private _email: string;
  private _assetTypeId: string;
  private _siteId: string;
  private _dateNeeded: Date;
  private _dateReturned: Date;
  private _equipmentList: string[];
  private _projectType: string;
  private _uploadedProjectFileId: string;
  private _previousCustomer: boolean;

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get companyName(): string {
    return this._companyName;
  }

  set companyName(value: string) {
    this._companyName = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get assetTypeId(): string {
    return this._assetTypeId;
  }

  set assetTypeId(value: string) {
    this._assetTypeId = value;
  }

  get siteId(): string {
    return this._siteId;
  }

  set siteId(value: string) {
    this._siteId = value;
  }

  get dateNeeded(): Date {
    return this._dateNeeded;
  }

  set dateNeeded(value: Date) {
    this._dateNeeded = value;
  }

  get dateReturned(): Date {
    return this._dateReturned;
  }

  set dateReturned(value: Date) {
    this._dateReturned = value;
  }

  // get equipmentList(): Array<string> {
  //   return this._equipmentList;
  // }

  // set equipmentList(value: Array<string>) {
  //   this._equipmentList = value;
  // }

  get projectType(): string {
    return this._projectType;
  }

  set projectType(value: string) {
    this._projectType = value;
  }

  get uploadedProjectFileId(): string {
    return this._uploadedProjectFileId;
  }

  set uploadedProjectFileId(value: string) {
    this._uploadedProjectFileId = value;
  }

  get previousCustomer(): boolean {
    return this._previousCustomer;
  }

  set previousCustomer(value: boolean) {
    this._previousCustomer = value;
  }

}
