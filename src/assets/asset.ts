import {DiscreteItem} from './discrete.item';
import {InventoryItem} from './inventory.item';
import {Building} from './building';
import {Lot} from './lot';
import {AssetSpecification} from './asset.specification';

export class Asset {
  assetId: string;
  assetTypeId: string;
  name: string;
  createdOn: Date;
  destroyOn: Date;
  description: string;
  discreteItem: DiscreteItem;
  inventoryItem: InventoryItem;
  building: Building;
  lot: Lot;
  specification: AssetSpecification;

  constructor() {
    this.discreteItem = new DiscreteItem();
    this.inventoryItem = new InventoryItem();
    this.building = new Building();
    this.lot = new Lot();
    this.specification = new AssetSpecification();
  }
}
