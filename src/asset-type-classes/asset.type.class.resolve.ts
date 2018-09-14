import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AssetTypeClassService } from "./asset.type.class.service";
import { AssetTypeClassResponse} from "./asset.type.class.response";

@Injectable()
export class AssetTypeClassResolve implements Resolve<AssetTypeClassResponse> {
  constructor(private assetTypeClassService: AssetTypeClassService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.assetTypeClassService.getAssetTypeClass(route.paramMap.get('assetTypeClassId'));
  }
}
