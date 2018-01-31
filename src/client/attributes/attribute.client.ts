import {Observable} from "rxjs/Observable";
import {AttributeState} from "./attribute.state";

export abstract class AttributeClient {
  abstract getAttributes() :Observable<AttributeState[]>;

  abstract addAttribute(attributeState: AttributeState): Observable<AttributeState>;
}
