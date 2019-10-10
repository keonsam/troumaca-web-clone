import {AttributeType} from './attribute.type';

export class Attribute {
  assetCharacteristicId: string;
  assetCharacteristicTypeId: string;
  name: string;
  list: string[];
  preFilled: boolean;
  defaultValue: string;
  required: string;
  description: string;
}
