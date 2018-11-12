import {Attribute} from "../attributes/attribute";

export class AssignedAttribute {

  assignedAttributeId: string;
  assetTypeClassId: string;
  attributeId: string;
  attribute: Attribute;
  required: boolean;
  createdOn: Date;
  modifiedOn: Date;

  constructor(attributeId?: string) {
    this.attributeId = attributeId;
  }
}
