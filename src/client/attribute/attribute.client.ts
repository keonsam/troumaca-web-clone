import {Observable} from 'rxjs/Observable';
import {AttributeState} from './attribute.state';
import {AttributeStates} from './attribute.states';
import {DataTypeState} from './data.type.state';
import {UnitOfMeasureState} from '../unit-of-measure/unit.of.measure.state';

export abstract class AttributeClient {

  abstract getDataTypes(): Observable<DataTypeState[]>;

  abstract getAttributesStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<AttributeStates>;

  abstract getAttributeState(attributeId: string): Observable<AttributeState>;

  abstract findUnitOfMeasureIdState(searchStr: string, pageSize: number): Observable<UnitOfMeasureState[]>

  abstract addAttribute(attributeState: AttributeState): Observable<AttributeState>;

  abstract updateAttribute(attributeId: string, attributeState: AttributeState): Observable<number>;

  abstract deleteAttribute(attributeId: string): Observable<number>;
}
