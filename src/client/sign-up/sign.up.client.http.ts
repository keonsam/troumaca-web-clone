import {SignUpClient} from "./sign.up.client";
import {UUIDGenerator} from "../../uuid.generator";

export class SignUpClientHttp extends SignUpClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

}