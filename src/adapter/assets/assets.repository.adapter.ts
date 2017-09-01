import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {AssetsRepository} from "../../assets/assets.repository";
import {AssetClient} from "../../client/asset/asset.client";
import {AssetModel} from "../../assets/asset.model";

export class AssetsRepositoryAdapter extends AssetsRepository {

  constructor(private aassetClient: AssetClient) {
    super();
  }

  public getAssetTypes(): Observable<AssetModel> {
    return null;
  }
}