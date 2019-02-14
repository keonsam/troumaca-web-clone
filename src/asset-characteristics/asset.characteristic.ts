import {Type} from './type';
import {UnitOfMeasure} from '../unit-of-measure/unit.of.measure';

export class AssetCharacteristic {
  assetCharacteristicId: string;
  typeId: string;
  type: Type;
  name: string;
  defaultValue: string;
  description: string;
  unitOfMeasureId: string;
  unitOfMeasure: UnitOfMeasure;
  maxValue: string;
  minValue: string;
  formula: string;
  calLevel: string;
  catValue: string;
  effectiveDate: string;
  untilDate: string;
}
