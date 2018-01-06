import {AttributeClient} from "./attribute.client";
import {Observable} from "rxjs/Observable";
import {AttributeState} from "./attribute.state";

export class AttributeClientMock extends AttributeClient {
  public getAttributes(): Observable<AttributeState[]> {
    return undefined;
  }
}