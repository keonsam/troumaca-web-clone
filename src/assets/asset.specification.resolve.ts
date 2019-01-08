import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AssetService } from './asset.service';
import {AssetSpecification} from "./asset.specification";

@Injectable()
export class AssetSpecificationResolve implements Resolve<AssetSpecification> {
  constructor(private assetService: AssetService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.assetService.getAssetSpecById(route.paramMap.get('assetId'));
  }
}
