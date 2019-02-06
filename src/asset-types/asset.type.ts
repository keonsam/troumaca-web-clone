import {AssetSpecification} from '../assets/asset-specification/asset.specification';
import {AssignedCharacteristic} from '../asset-characteristics/assigned.characteristic';
import {AssetName} from '../asset-name-types/asset.name';
import {AssetIdentifier} from '../asset-identifier-types/asset.identifier';
import {AssetRole} from '../asset-role-types/asset.role';
import {Instance} from './instance';

export class AssetType {
  assetTypeId: string;
  instanceId: string;
  instance: Instance;
  initialId: string;
  parentId: string;
  parentName: string;
  name: string;
  description: string;
  specification: AssetSpecification;
  assignedCharacteristics: AssignedCharacteristic[];
  assetNames: AssetName[];
  identifiers: AssetIdentifier[];
  roles: AssetRole[];
}

