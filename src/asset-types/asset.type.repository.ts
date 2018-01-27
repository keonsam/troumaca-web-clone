import {AssetType} from "../assets/asset.type";
import {Observable} from "rxjs/Observable";
import {AssetTypes} from "../assets/asset.types";

export abstract class AssetTypeRepository {
  abstract getAssetTypes():Observable<AssetType[]>;
  abstract findAssetTypes(searchStr: string, pageSize:number):Observable<AssetTypes>;
}