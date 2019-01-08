import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AssetService } from './asset.service';
import {AssetCharacteristics} from "./asset.characteristics";

@Injectable()
export class AssetCharacteristicsResolve implements Resolve<AssetCharacteristics> {
  constructor(private assetService: AssetService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.assetService.getAssetCharacteristicsById(route.paramMap.get('assetId'));
  }
}
