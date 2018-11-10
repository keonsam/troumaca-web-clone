export class AssignedAttribute {

  assignedAttributeId: string;
  assetTypeClassId: string;
  attributeId: string;
  required: boolean;
  createdOn: Date;
  modifiedOn: Date;

  constructor(attributeId?: string) {
    this.attributeId = attributeId;
  }
}
