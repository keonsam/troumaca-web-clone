import {AssetTypeClient} from "./asset.type.client";
import {UUIDGenerator} from "../../uuid.generator";

export class AssetTypeClientHttp extends AssetTypeClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

}