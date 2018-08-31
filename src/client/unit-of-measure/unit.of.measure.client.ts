import {Observable} from 'rxjs';
import { UnitOfMeasureState } from "./unit.of.measure.state";

export abstract class UnitOfMeasureClient {

  public abstract findUnitOfMeasureStates(searchStr: string, pageSize: number): Observable<UnitOfMeasureState[]>;

}
