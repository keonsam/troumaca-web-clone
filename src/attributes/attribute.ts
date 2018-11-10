import {UnitOfMeasure} from "../unit-of-measure/unit.of.measure";
import {DataType} from "./data.type";

export class Attribute {

  attributeId: string;
  tenantId: string;
  name: string;
  format: string;
  dataTypeId: string;
  dataType: DataType;
  unitOfMeasureId: string;
  unitOfMeasure: UnitOfMeasure;
  maximumValue: string;
  minimumValue: string;
  createdOn: Date;
  modifiedOn: Date;

}
