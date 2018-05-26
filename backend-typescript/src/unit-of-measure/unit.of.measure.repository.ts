import {UnitOfMeasure} from "./unit.of.measure";
import {Observable} from "rxjs/Observable";

export interface UnitOfMeasureRepository {
  findUnitOfMeasure(searchStr:string, pageSize:number):Observable<UnitOfMeasure[]>;

  getUnitOfMeasureById(unitOfMeasureId: string): Observable<UnitOfMeasure>;

  getUnitOfMeasureByIds(unitOfMeasureIds: string[]): Observable<UnitOfMeasure[]>;

}
