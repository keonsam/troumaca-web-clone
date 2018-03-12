import {AssetTypeRepository} from "./asset.type.repository";
import {AssetTypeDbRepository} from "./asset.type.db.repository";
import {AssetTypeRestRepository} from "./asset.type.rest.repository";

var useDatabase = false;

export function createAssetTypeRepository(options):AssetTypeRepository {

  if (options) {
    useDatabase = options.useDatabase;
  }

  if (useDatabase) {
    return new AssetTypeDbRepository();
  } else {
    return new AssetTypeRestRepository();
  }
}