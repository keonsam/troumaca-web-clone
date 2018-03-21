import {Observable} from "rxjs/Observable";
import {Value} from "./value";

export interface ValueRepository {

  findValues(searchStr:string, pageSize:number): Observable<Value[]>;

  saveValue(value:Value):Observable<Value>;

  getValues(pageNumber:number, pageSize:number, order:string):Observable<Value[]>;

  getValueCount():Observable<number>;

  getValuesByAssetTypeId(assetTypeId: string): Observable<Value[]>;
  getValueById(valueId:string):Observable<Value>;

  updateValue(valueId:string, valueType:Value):Observable<number>;

  deleteValue(valueId:string):Observable<number>;

  deleteValuesByAssetTypeId(assetTypeId:string): Observable<number>;
}
