import {AssetTypeModel} from "./asset.types.model";
import {Observable} from "rxjs/Observable";

export abstract class AssetTypesRepository {
  abstract getAssetTypes():Observable<AssetTypeModel[]>;
}