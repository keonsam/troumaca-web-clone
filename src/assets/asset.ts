import {AssetKind} from "./asset.kind";
import {AssetType} from "../asset-types/asset.type";
import {UnitOfMeasure} from "../unit-of-measure/unit.of.measure";
import {User} from "../parties/user";
import {Site} from "../site/site";

export class Asset {
  assetId: string;
  tenantId: string;
  assetKindId: string;
  assetKind: AssetKind;
  assetTypeId: string;
  assetType: AssetType;
  serialNumber: string;
  quantity: string;
  unitOfMeasureId: string;
  unitOfMeasure: UnitOfMeasure;
  description: string;
  personId: string;
  person: User;
  siteId: string;
  site: Site;
  createdOn: string;
  modifiedOn: string;

  toJson() {
    return {
      assetId: this.assetId,
      tenantId: this.tenantId,
      assetKindId: this.assetKindId,
      assetTypeId: this.assetTypeId,
      serialNumber: this.serialNumber,
      quantity: this.quantity,
      unitOfMeasureId: this.unitOfMeasureId,
      description: this.description,
      personId: this.personId,
      siteId: this.siteId,
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn,
    }
  }
}
