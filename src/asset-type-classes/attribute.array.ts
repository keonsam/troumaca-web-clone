export class AttributeArray {

  private _attributeId: string;
  private _required: boolean;

  constructor(attributeId: string, required: boolean) {
    this._attributeId = attributeId;
    this._required = required;
  }

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

  toJson() {
    return {
      attributeId: this.attributeId,
      required: this.required
    }
  }
}
