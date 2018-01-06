export class UnitOfMeasureState {

  private _unitOfMeasureId:string;
  private _type:string;
  private _name:string;
  private _title:string;
  private _description:string;
  private _symbol:string;
  private _abbreviation:string;

  constructor(unitOfMeasureId?: string, name?: string, type?: string, title?:string, description?:string, symbol?:string, abbreviation?:string) {
    this._unitOfMeasureId = unitOfMeasureId;
    this._name = name;
    this._type = type;
    this._type = title;
    this._description = description;
    this._symbol = symbol;
    this._abbreviation = abbreviation;
  }

  get unitOfMeasureId(): string {
    return this._unitOfMeasureId;
  }

  set unitOfMeasureId(value: string) {
    this._unitOfMeasureId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get symbol(): string {
    return this._symbol;
  }

  set symbol(value: string) {
    this._symbol = value;
  }

  get abbreviation(): string {
    return this._abbreviation;
  }

  set abbreviation(value: string) {
    this._abbreviation = value;
  }

}