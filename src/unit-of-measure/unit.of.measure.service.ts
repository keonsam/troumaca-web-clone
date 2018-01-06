import {UnitOfMeasureRepository} from "./unit.of.measure.repository";
import {Observable} from "rxjs/Observable";
import {UnitOfMeasure} from "./unit.of.measure";

export class UnitOfMeasureService {

  constructor(private unitOfMeasureRepository:UnitOfMeasureRepository) {
  }

  public getUnitOfMeasures():Observable<UnitOfMeasure> {
    return this.unitOfMeasureRepository.getUnitOfMeasures();
  }

}