import {Observable} from "rxjs";
import {Asset} from "../assets/asset";
import {Depreciation} from "./depreciation";
import {DepreciationArr} from "./depreciation.arr";
import {DepreciationMethod} from "./depreciation.method";
import {DepreciationSystem} from "./depreciation.system";
import {PropertyClass} from "./property.class";

export abstract class DepreciationRepository {

  public abstract findAssets(searchStr: string, pageSize: number): Observable<Asset[]>;

  public abstract getDepreciationArr(pageNumber: number, pageSize: number, sortOrder: string, type: string): Observable<DepreciationArr>;

  public abstract getDepreciation(depreciationId: string, type: string): Observable<Depreciation>;

  public abstract addDepreciation(depreciation: Depreciation, type: string): Observable<Depreciation>;

  public abstract updateDepreciation(depreciation: Depreciation, type: string): Observable<number>;

  public abstract deleteDepreciation(depreciationId: string, type: string): Observable<number>;

  public abstract getDepreciationMethod(type: string, system?: string): Observable<DepreciationMethod[]>;

  public abstract getDepreciationSystem(): Observable<DepreciationSystem[]>;

  public abstract getPropertyClasses(system?: string): Observable<PropertyClass[]>;

}


