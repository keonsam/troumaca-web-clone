import {AssetCharacteristicRepository} from '../../asset-characteristics/asset.characteristic.repository';
import { AssetCharacteristicClient} from '../../client/asset-characteristics/asset.characteristic.client';
import {Observable} from 'rxjs';
import {AssetCharacteristics} from '../../asset-characteristics/asset.characteristics';
import {AssetCharacteristic} from '../../asset-characteristics/asset.characteristic';
import {Type} from '../../asset-characteristics/type';
import {UnitOfMeasure} from '../../unit-of-measure/unit.of.measure';

export class AssetCharacteristicRepositoryAdapter extends  AssetCharacteristicRepository {

  constructor(private assetCharacteristicClient: AssetCharacteristicClient) {
    super();
  }

  getAssetCharacteristics(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetCharacteristics> {
    return this.assetCharacteristicClient.getAssetCharacteristics(pageNumber, pageSize, sortOrder);
  }

  getAssetCharacteristic(assetCharacteristicId: string): Observable<AssetCharacteristic> {
    return this.assetCharacteristicClient.getAssetCharacteristic(assetCharacteristicId);
  }

  addAssetCharacteristic(assetCharacteristic: AssetCharacteristic): Observable<AssetCharacteristic> {
    return this.assetCharacteristicClient.addAssetCharacteristic(assetCharacteristic);
  }

  updateAssetCharacteristic(assetCharacteristic: AssetCharacteristic): Observable<number> {
    return this.assetCharacteristicClient.updateAssetCharacteristic(assetCharacteristic);
  }

  deleteAssetCharacteristic(assetCharacteristicId: string): Observable<number> {
    return this.assetCharacteristicClient.deleteAssetCharacteristic(assetCharacteristicId);
  }

  // OTHER

  getTypes(): Observable<Type[]> {
    return this.assetCharacteristicClient.getTypes();
  }

  findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
    return this.assetCharacteristicClient.findUnitOfMeasures(searchStr, pageSize);
  }
}
