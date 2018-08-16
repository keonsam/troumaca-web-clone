import {Observable} from "rxjs";
import {Asset} from "../assets/asset";
import {Depreciation} from "./depreciation";
import {DepreciationArr} from "./depreciation.arr";
import {DepreciationMethod} from "./depreciation.method";

export abstract class DepreciationRepository {

  public abstract findAssets(searchStr: string, pageSize: number): Observable<Asset[]>;

  public abstract getBookDepreciationArr(pageNumber: number, pageSize: number, sortOrder: string): Observable<DepreciationArr>;

  public abstract getDepreciation(depreciationId: string): Observable<Depreciation>;

  public abstract addDepreciation(depreciation: Depreciation, type: string): Observable<Depreciation>;

  public abstract updateDepreciation(depreciation: Depreciation): Observable<number>;

  public abstract deleteDepreciation(depreciationId: string): Observable<number>;

  public abstract getDepreciationMethod(): Observable<DepreciationMethod[]>;

}


