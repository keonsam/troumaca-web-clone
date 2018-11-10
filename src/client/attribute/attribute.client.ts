import {Observable} from 'rxjs';
import {Attributes} from "../../attributes/attributes";
import {DataType} from "../../attributes/data.type";
import {Attribute} from "../../attributes/attribute";

export abstract class AttributeClient {

  abstract getDataTypes(): Observable<DataType[]>;

  abstract getAttributesStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<Attributes>;

  abstract getAttribute(attributeId: string): Observable<Attribute>;

  abstract addAttribute(attributeState: Attribute): Observable<Attribute>;

  abstract updateAttribute(attributeId: string, attributeState: Attribute): Observable<number>;

  abstract deleteAttribute(attributeId: string): Observable<number>;
}
