import {DepreciationRepository} from "../../depreciation/depreciation.repository";
import {DepreciationClient} from "../../client/depreciation/depreciation.client";
import {Observable} from "rxjs";
import { map } from "rxjs/operators";
import {Asset} from "../../assets/asset";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {Depreciation} from "../../depreciation/depreciation";
import {DepreciationState} from "../../client/depreciation/depreciation.state";
import {DepreciationArr} from "../../depreciation/depreciation.arr";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";
import {DepreciationMethod} from "../../depreciation/depreciation.method";
import {DepreciationSystem} from "../../depreciation/depreciation.system";
import {PropertyClass} from "../../depreciation/property.class";

export class DepreciationRepositoryAdapter extends DepreciationRepository {

  constructor(private depreciationClient: DepreciationClient) {
    super();
  }

  public findAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
    return this.depreciationClient.findAssets(searchStr, pageSize)
      .pipe(map(values => {
        return values.map( value => {
          return mapObjectProps(value, new Asset());
        });
      }));
  }


  public getDepreciationArr(pageNumber: number, pageSize: number, sortOrder: string, type: string): Observable<DepreciationArr> {
    return this.depreciationClient.getDepreciationArr(pageNumber, pageSize, sortOrder, type)
      .pipe(map(values => {
        const depreciationModels: DepreciationArr = new DepreciationArr();
        depreciationModels.depreciation = values.depreciation.map( value => {
          return mapObjectProps(value, new Depreciation());
        });
        depreciationModels.page = mapObjectProps(values.page, new Page());
        depreciationModels.sort = mapObjectProps(values.sort, new Sort());
        return depreciationModels;
      }));
  }

  public getDepreciation(depreciationId: string, type: string): Observable<Depreciation> {
    return this.depreciationClient.getDepreciation(depreciationId, type)
      .pipe(map(value => {
        return mapObjectProps(value, new Depreciation());
      }));
  }

  public addDepreciation(depreciation: Depreciation, type: string): Observable<Depreciation> {
    return this.depreciationClient.addDepreciation(mapObjectProps(depreciation, new DepreciationState()), type)
    .pipe(map(value => {
      return mapObjectProps(value, new Depreciation());
    }));
  }

  public updateDepreciation(depreciation: Depreciation, type: string): Observable<number> {
    return this.depreciationClient.updateDepreciation(mapObjectProps(depreciation, new DepreciationState()), type);
  }

  public deleteDepreciation(depreciationId: string, type: string): Observable<number> {
    return this.depreciationClient.deleteDepreciation(depreciationId, type);
  }

  public getDepreciationMethod(type: string, system?: string): Observable<DepreciationMethod[]> {
    return this.depreciationClient.getDepreciationMethod(type, system);
  }

  public getDepreciationSystem(): Observable<DepreciationSystem[]> {
    return this.depreciationClient.getDepreciationSystem();
  }

  public getPropertyClasses(system?: string): Observable<PropertyClass[]> {
    return this.depreciationClient.getPropertyClasses(system);
  }

}
