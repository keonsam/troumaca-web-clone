import {Observable} from "rxjs/Observable";
import {AttributeState} from "./attribute.state";
import {AttributeStates} from "./attribute.states";

export abstract class AttributeClient {
  abstract getAttributesStates(pageNumber:number, pageSize:number, sortOrder:string) :Observable<AttributeStates>;

  abstract getAttributeState(attributeId: string):Observable<AttributeState>;

  abstract addAttribute(attributeState: AttributeState): Observable<AttributeState>;

  abstract updateAttribute(attributeId: string, attributeState: AttributeState): Observable<number>;

  abstract deleteAttribute(attributeId: string): Observable<number>;
}
