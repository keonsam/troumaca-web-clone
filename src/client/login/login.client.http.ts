import {LoginClient} from "./login.client";
import {UUIDGenerator} from "../../uuid.generator";

export class LoginClientHttp extends LoginClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

}