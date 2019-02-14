import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {AssetNameType} from './asset.name.type';
import {AssetNameTypeService} from './asset.name.type.service';
import {Observable} from 'rxjs';

export class AssetNameTypeResolve implements Resolve<AssetNameType> {
  constructor(private assetNameTypeService: AssetNameTypeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<AssetNameType> {
    return this.assetNameTypeService.getAssetNameType(route.paramMap.get('assetNameTypeId'));
  }
}
