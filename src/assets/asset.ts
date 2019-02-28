import {DiscreteItem} from './discrete.item';
import {InventoryItem} from './inventory.item';
import {Building} from './building';
import {Lot} from './lot';
import {AssetName} from '../asset-name-types/asset.name';
import {AssetIdentifier} from '../asset-identifier-types/asset.identifier';
import {AssetRole} from '../asset-role-types/asset.role';
import {AssetType} from '../asset-types/asset.type';

export class Asset {
  assetId: string;
  assetTypeId: string;
  assetType: AssetType;
  name: string;
  createdOn: Date;
  destroyOn: Date;
  description: string;

  discreteItem: DiscreteItem;
  inventoryItem: InventoryItem;
  building: Building;
  lot: Lot;

  assetNames: AssetName[];
  identifiers: AssetIdentifier[];
  roles: AssetRole[];

  constructor() {
    this.discreteItem = new DiscreteItem();
    this.inventoryItem = new InventoryItem();
    this.building = new Building();
    this.lot = new Lot();
  }
}
