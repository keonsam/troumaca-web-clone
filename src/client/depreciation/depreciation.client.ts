import {Observable} from "rxjs";
import {DepreciationState} from "./depreciation.state";
import {AssetState} from "../asset/asset.state";
import {DepreciationStates} from "./depreciation.states";
import {DepreciationMethod} from "../../depreciation/depreciation.method";

export abstract class DepreciationClient {
  public abstract findAssets(searchStr: string, pageSize: number): Observable<AssetState[]>;

  public abstract getBookDepreciationArr(pageNumber: number, pageSize: number, sortOrder: string): Observable<DepreciationStates>;

  public abstract getDepreciation(depreciationId: string): Observable<DepreciationState>;

  public abstract addDepreciation(depreciationState: DepreciationState, type: string): Observable<DepreciationState>;

  public abstract updateDepreciation(depreciation: DepreciationState): Observable<number>;

  public abstract deleteDepreciation(depreciationId: string): Observable<number>;

  public abstract getDepreciationMethod(): Observable<DepreciationMethod[]>;


}
