import {createValueRepository} from './value.repository.factory';
import {ValueRepository} from "./value.repository";
import {Observable} from "rxjs/Observable";
import {Value} from "./value";
import {shapeValuesResponse} from "./value.response.shaper";
import {Result} from "../../result.success";
import {getSortOrderOrDefault} from "../../sort.order.util";


export class ValueOrchestrator {

  private valueRepository:ValueRepository;

  constructor(options?:any) {
    this.valueRepository = createValueRepository(options);
  }

  findValues(searchStr:string, pageSize:number):Observable<Value[]> {
    return this.valueRepository.findValues(searchStr, pageSize);
  }

  saveValue(value:Value):Observable<Value> {
    return this.valueRepository.saveValue(value);
  };

  getValueCount():Observable<number> {
    return this.valueRepository.getValueCount();
  }

  getValues(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort:string = getSortOrderOrDefault(field, direction);
    return this.valueRepository
      .getValues(number, size, sort)
      .flatMap(value => {
        return this.valueRepository
          .getValueCount()
          .map(count => {
            let shapeValuesResp:any = shapeValuesResponse(value, number, size, value.length, count, sort);
            return new Result<any>(false, "values", shapeValuesResp);
          });
      });

  }

  getValueById(valueId:string):Observable<Value> {
    return this.valueRepository.getValueById(valueId);
  }

  updateValue(valueId:string, value:Value):Observable<number> {
    return this.valueRepository.updateValue(valueId, value);
  }

  deleteValue(valueId:string):Observable<number> {
    return this.valueRepository.deleteValue(valueId);
  }

}
