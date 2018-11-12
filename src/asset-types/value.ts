export class Value {

  valueId: string;
  tenantId: string;
  assetTypeId: string;
  attributeId: string;
  text: string;
  createdOn: Date;
  modifiedOn: Date;

  constructor( attributeId?: string, text?: string) {
    this.attributeId = attributeId;
    this.text = text;
  }
}
