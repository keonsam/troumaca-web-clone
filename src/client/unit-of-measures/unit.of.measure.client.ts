import {Observable} from "rxjs/Observable";
import {UnitOfMeasureStates} from "./unit.of.measure.states";

export abstract class UnitOfMeasureClient {

  public abstract findUnitOfMeasureStates(searchStr:string, pageSize:number):Observable<UnitOfMeasureStates>;

}