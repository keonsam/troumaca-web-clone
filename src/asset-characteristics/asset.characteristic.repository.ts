import {Observable} from 'rxjs';
import { AssetCharacteristics} from './asset.characteristics';
import { AssetCharacteristic} from './asset.characteristic';
import {Type} from './type';
import {UnitOfMeasure} from '../unit-of-measure/unit.of.measure';

export abstract class AssetCharacteristicRepository {
  abstract getAssetCharacteristics(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetCharacteristics>;
  abstract getAssetCharacteristic(brandId: string): Observable<AssetCharacteristic>;
  abstract addAssetCharacteristic(brand: AssetCharacteristic): Observable<AssetCharacteristic>;
  abstract updateAssetCharacteristic(brand: AssetCharacteristic): Observable<number>;
  abstract deleteAssetCharacteristic(brandId: string): Observable<number>;

  // OTHERS
  abstract getTypes(): Observable<Type[]>
  abstract findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]>;
}
