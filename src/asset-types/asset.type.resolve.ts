import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AssetTypeService } from "./asset.type.service";
import { AssetTypeResponse} from "./asset.type.response";

@Injectable()
export class AssetTypeResolve implements Resolve<AssetTypeResponse> {
  constructor(private assetTypeService: AssetTypeService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.assetTypeService.getAssetType(route.paramMap.get('assetTypeId'));
  }
}