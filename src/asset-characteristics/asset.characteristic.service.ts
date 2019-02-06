import {AssetCharacteristic} from './asset.characteristic';
import {Observable} from 'rxjs';
import {AssetCharacteristics} from './asset.characteristics';
import {AssetCharacteristicRepository} from './asset.characteristic.repository';
import {Type} from './type';
import {UnitOfMeasure} from '../unit-of-measure/unit.of.measure';

export class AssetCharacteristicService {

  constructor(private assetCharacteristicRepository: AssetCharacteristicRepository) {
  }

  findAssetCharacteristics(searchStr: string, pageSize: number): Observable<AssetCharacteristic[]> {
    return this.assetCharacteristicRepository.findAssetCharacteristics(searchStr, pageSize);
  }

  getAssetCharacteristics(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetCharacteristics> {
    return this.assetCharacteristicRepository.getAssetCharacteristics(pageNumber, pageSize, sortOrder);
  }

  getAssetCharacteristic(assetCharacteristicId: string): Observable<AssetCharacteristic> {
    return this.assetCharacteristicRepository.getAssetCharacteristic(assetCharacteristicId);
  }

  addAssetCharacteristic(assetCharacteristic: AssetCharacteristic): Observable<AssetCharacteristic> {
    return this.assetCharacteristicRepository.addAssetCharacteristic(assetCharacteristic);
  }

  updateAssetCharacteristic(assetCharacteristic: AssetCharacteristic): Observable<number> {
    return this.assetCharacteristicRepository.updateAssetCharacteristic(assetCharacteristic);
  }

  deleteAssetCharacteristic(assetCharacteristicId: string): Observable<number> {
    return this.assetCharacteristicRepository.deleteAssetCharacteristic(assetCharacteristicId);
  }

  // OTHERS

  getTypes(): Observable<Type[]> {
    return this.assetCharacteristicRepository.getTypes();
  }

  findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
    return this.assetCharacteristicRepository.findUnitOfMeasures(searchStr, pageSize);
  }

}
