import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AssetService } from './asset.service';
import { Asset } from './asset';

@Injectable()
export class AssetResolve implements Resolve<Asset> {
  constructor(private assetService: AssetService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.assetService.getAssetById(route.paramMap.get('assetId'));
  }
}
