import {LogoutClient} from "./logout.client";
import {UUIDGenerator} from "../../uuid.generator";

export class LogoutClientHttp extends LogoutClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

}