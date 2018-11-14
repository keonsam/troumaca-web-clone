import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AssetTypeClassService } from "./asset.type.class.service";
import {AssetTypeClass} from "./asset.type.class";

@Injectable()
export class AssetTypeClassResolve implements Resolve<AssetTypeClass> {
  constructor(private assetTypeClassService: AssetTypeClassService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.assetTypeClassService.getAssetTypeClass(route.paramMap.get('assetTypeClassId'));
  }
}
