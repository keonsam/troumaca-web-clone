import {AssetTypeClass} from "../asset-type-classes/asset.type.class";
import {UnitOfMeasure} from "../unit-of-measure/unit.of.measure";

export class AssetType {
  assetTypeId: string;
  assetTypeClassId: string;
  unitOfMeasureId: string;
  modelNumber: string;
  description: string;
  name: string;
  materialCode: string;
  unitOfMeasure: UnitOfMeasure;
  assetTypeClass: AssetTypeClass;
  createdOn: Date;
  modifiedOn: Date;
}
