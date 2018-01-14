import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import { map, reduce, somethingElse } from "underscore";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {AssetUnitOfMeasureRepository} from "../../assets/assset.unit.of.measure.repository";
import {UnitOfMeasures} from "../../assets/asset.unit.of.measures";
import {UnitOfMeasureClient} from "../../client/unit-of-measures/unit.of.measure.client";
import {UnitOfMeasure} from "../../assets/asset.unit.of.measure";

export class UnitOfMeasureRepositoryAdapter extends AssetUnitOfMeasureRepository {

  constructor(private unitOfMeasureClient: UnitOfMeasureClient) {
    super();
  }

  findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasures> {
    return this.unitOfMeasureClient
      .findUnitOfMeasureStates(searchStr, pageSize)
      .map(values => {
        let unitOfMeasures:UnitOfMeasures = new UnitOfMeasures();
        unitOfMeasures.unitOfMeasures = map(values.unitOfMeasures, value => {
          return mapObjectProps(value, new UnitOfMeasure());
        });
        return unitOfMeasures;
      });
  }

}