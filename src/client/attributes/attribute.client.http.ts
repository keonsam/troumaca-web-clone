import {AttributeClient} from "./attribute.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import {AttributeState} from "./attribute.state";

export class AttributeClientHttp extends AttributeClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

  public getAttributes(): Observable<AttributeState[]> {
    throw new Error("Method not implemented.");
  }

}