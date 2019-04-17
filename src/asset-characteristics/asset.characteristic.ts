import {UnitOfMeasure} from '../unit-of-measure/unit.of.measure';
import { AssetCharacteristicType } from './asset.characteristic.type';

export class AssetCharacteristic {
  assetCharacteristicId: string;
  assetCharacteristicTypeId: string;
  assetCharacteristicType: AssetCharacteristicType;
  name: string;
  defaultValue: string;
  description: string;
  unitOfMeasurementId: string;
  unitOfMeasurement: UnitOfMeasure;
  formula: string;
  calculationLevel: string;
  maximumValue: string;
  minimumValue: string;
  categoryValue: string;
  effectiveDate: string;
  untilDate: string;
  version: string;
}
