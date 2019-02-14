import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {AssetIdentifierTypeService} from './asset.identifier.type.service';
import {Observable} from 'rxjs';
import {AssetIdentifierTypes} from './asset.identifier.types';

export class AssetIdentifierTypesResolve implements Resolve<AssetIdentifierTypes> {
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  constructor(private assetIdentifierTypesService: AssetIdentifierTypeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<AssetIdentifierTypes> {
    return this.assetIdentifierTypesService.getAssetIdentifierTypes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder);
  }
}
