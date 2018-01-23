import {AssetTypeClassRepository} from "./asset.type.class.repository";
import {Observable} from "rxjs/Observable";
import {AssetTypeClass} from "./asset.type.class";

export class AssetTypeClassService {

  constructor(private assetTypeClassRepository: AssetTypeClassRepository) {
  }

  public getAssetTypeClasses():Observable<AssetTypeClass[]> {
    return this.assetTypeClassRepository.getAssetTypeClasses();
  }

  public addAssetTypeClass(assetTypeClass: AssetTypeClass): Observable<AssetTypeClass> {
    return this.assetTypeClassRepository.addAssetTypeClass(assetTypeClass);
  }
}
