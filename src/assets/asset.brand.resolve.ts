import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AssetService } from './asset.service';
import {AssetBrand} from "./asset.brand";

@Injectable()
export class AssetBrandResolve implements Resolve<AssetBrand> {
  constructor(private assetService: AssetService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.assetService.getAssetBrandById(route.paramMap.get('assetId'));
  }
}
