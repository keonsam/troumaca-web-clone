import {SiteClient} from "./site.client";
import {UUIDGenerator} from "../../uuid.generator";

export class SiteClientHttp extends SiteClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

}