export class AttributeArray {

  private _attributeId: string;
  private _required: boolean;

  get attributeId(): string {
    return this._attributeId;
  }

  set attributeId(value: string) {
    this._attributeId = value;
  }

  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = value;
  }
}
