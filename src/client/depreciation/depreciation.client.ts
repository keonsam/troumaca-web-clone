import {Observable} from "rxjs";
import {DepreciationState} from "./depreciation.state";
import {AssetState} from "../asset/asset.state";
import {DepreciationStates} from "./depreciation.states";

export abstract class DepreciationClient {
  public abstract findAssets(searchStr: string, pageSize: number): Observable<AssetState[]>;

  public abstract getDepreciationArr(pageNumber: number, pageSize: number, sortOrder: string): Observable<DepreciationStates>;

  public abstract getDepreciation(depreciationId: string): Observable<DepreciationState>;

  public abstract addDepreciation(depreciationState: DepreciationState): Observable<DepreciationState>;

  public abstract updateDepreciation(depreciation: DepreciationState): Observable<number>;

  public abstract deleteDepreciation(depreciationId: string): Observable<number>;

}
