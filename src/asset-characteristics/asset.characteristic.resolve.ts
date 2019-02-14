import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {AssetCharacteristic} from './asset.characteristic';
import {AssetCharacteristicService} from './asset.characteristic.service';
import {Observable} from 'rxjs';

export class AssetCharacteristicResolve implements Resolve<AssetCharacteristic> {
  constructor(private assetCharacteristicService: AssetCharacteristicService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<AssetCharacteristic> {
    return this.assetCharacteristicService.getAssetCharacteristic(route.paramMap.get('assetCharacteristicId'));
  }
}
