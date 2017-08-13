import {AssetClient} from "./asset.client";
import {UUIDGenerator} from "../../uuid.generator";

export class AssetClientHttp extends AssetClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

}