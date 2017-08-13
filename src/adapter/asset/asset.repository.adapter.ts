import "rxjs/add/operator/map";
import {AssetClient} from "../../client/asset/asset.client";
import {AssetRepository} from "../../asset/asset.repository";

export class AssetRepositoryAdapter extends AssetRepository {
  constructor(private aassetClient: AssetClient) {
    super();
  }
}