import {ActivityClient} from "./activity.client";
import {UUIDGenerator} from "../../uuid.generator";

export class ActivityClientHttp extends ActivityClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

}