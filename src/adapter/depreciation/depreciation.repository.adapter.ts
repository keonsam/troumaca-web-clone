import {DepreciationRepository} from "../../depreciation/depreciation.repository";
import {DepreciationClient} from "../../client/depreciation/depreciation.client";
import {Observable} from "rxjs";
import {Asset} from "../../assets/asset";
import { map } from 'underscore';
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {Depreciation} from "../../depreciation/depreciation";
import {DepreciationState} from "../../client/depreciation/depreciation.state";
import {DepreciationArr} from "../../depreciation/depreciation.arr";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";
import {DepreciationMethod} from "../../depreciation/depreciation.method";

export class DepreciationRepositoryAdapter extends DepreciationRepository {

  constructor(private depreciationClient: DepreciationClient) {
    super();
  }

  public findAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
    return this.depreciationClient.findAssets(searchStr, pageSize)
      .map(values => {
        return map(values, value => {
          return mapObjectProps(value, new Asset());
        });
      });
  }


  public getBookDepreciationArr(pageNumber: number, pageSize: number, sortOrder: string): Observable<DepreciationArr> {
    return this.depreciationClient.getBookDepreciationArr(pageNumber, pageSize, sortOrder)
      .map(values => {
        const depreciationModels: DepreciationArr = new DepreciationArr();
        depreciationModels.depreciation = map(values.depreciation, value => {
          return mapObjectProps(value, new Depreciation());
        });
        depreciationModels.page = mapObjectProps(values.page, new Page());
        depreciationModels.sort = mapObjectProps(values.sort, new Sort());
        return depreciationModels;
      });
  }

  public getDepreciation(depreciationId: string): Observable<Depreciation> {
    return this.depreciationClient.getDepreciation(depreciationId)
      .map(value => {
        return mapObjectProps(value, new Depreciation());
      });
  }

  public addDepreciation(depreciation: Depreciation, type: string): Observable<Depreciation> {
    return this.depreciationClient.addDepreciation(mapObjectProps(depreciation, new DepreciationState()), type)
    .map(value => {
      return mapObjectProps(value, new Depreciation());
    });
  }

  public updateDepreciation(depreciation: Depreciation): Observable<number> {
    return this.depreciationClient.updateDepreciation(mapObjectProps(depreciation, new DepreciationState()));
  }

  public deleteDepreciation(depreciationId: string): Observable<number> {
    return this.depreciationClient.deleteDepreciation(depreciationId);
  }

  public getDepreciationMethod(): Observable<DepreciationMethod[]> {
    return this.depreciationClient.getDepreciationMethod();
  }

}
