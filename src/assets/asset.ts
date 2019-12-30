import {DiscreteItem} from './discrete.item';
import {InventoryItem} from './inventory.item';
import {Building} from './building';
import {Lot} from './lot';
import {AssetType} from './asset-type/asset.type';

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
  version: string;
  image: string;

  constructor(name?: string) {
    this.name = name;
    this.discreteItem = new DiscreteItem();
    this.inventoryItem = new InventoryItem();
    this.building = new Building();
    this.lot = new Lot();
  }
}
