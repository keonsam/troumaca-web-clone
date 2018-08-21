import {Observable} from 'rxjs';
import {AssetUnionOfPhysicalSites} from './asset.union.of.physical.sites';

export abstract class AssetSiteRepository {

  public abstract findUnionOfPhysicalSites(searchStr: string, pageSize: number): Observable<AssetUnionOfPhysicalSites>;

}
