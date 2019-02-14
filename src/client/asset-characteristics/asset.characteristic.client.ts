import {Observable} from 'rxjs';
import {AssetCharacteristics} from '../../asset-characteristics/asset.characteristics';
import {AssetCharacteristic} from '../../asset-characteristics/asset.characteristic';
import {Type} from '../../asset-characteristics/type';
import {UnitOfMeasure} from '../../unit-of-measure/unit.of.measure';

export abstract class AssetCharacteristicClient {
  abstract findAssetCharacteristics(searchStr: string, pageSize: number): Observable<AssetCharacteristic[]>;
  abstract getAssetCharacteristics(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetCharacteristics>;
  abstract getAssetCharacteristic(assetCharacteristicId: string): Observable<AssetCharacteristic>;
  abstract addAssetCharacteristic(assetCharacteristic: AssetCharacteristic): Observable<AssetCharacteristic>;
  abstract updateAssetCharacteristic(assetCharacteristic: AssetCharacteristic): Observable<number>;
  abstract deleteAssetCharacteristic(assetCharacteristicId: string): Observable<number>;

  abstract getTypes(): Observable<Type[]>;
  abstract findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]>;
}
