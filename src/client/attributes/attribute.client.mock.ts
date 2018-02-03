import {AttributeClient} from "./attribute.client";
import {Observable} from "rxjs/Observable";
import {AttributeState} from "./attribute.state";
import {AttributeStates} from "./attribute.states";

export class AttributeClientMock extends AttributeClient {
  public getAttributesStates(pageNumber:number, pageSize:number, sortOrder:string): Observable<AttributeStates> {
    return undefined;
  }

  public getAttributeState(attributeId: string): Observable<AttributeState>{
   return null
 }

  public addAttribute(attributeState: AttributeState): Observable<AttributeState> {
    return null;
  }

  public updateAttribute(attributeId: string, attributeState: AttributeState): Observable<number> {
    return null;
  }

  public deleteAttribute(attributeId: string): Observable<number> {
    return null;
  }
}
