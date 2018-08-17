import {Observable} from "rxjs";
import {DepreciationState} from "./depreciation.state";
import {AssetState} from "../asset/asset.state";
import {DepreciationStates} from "./depreciation.states";
import {DepreciationMethod} from "../../depreciation/depreciation.method";
import {DepreciationSystem} from "../../depreciation/depreciation.system";
import {PropertyClass} from "../../depreciation/property.class";

export abstract class DepreciationClient {
  public abstract findAssets(searchStr: string, pageSize: number): Observable<AssetState[]>;

  public abstract getDepreciationArr(pageNumber: number, pageSize: number, sortOrder: string, type: string): Observable<DepreciationStates>;

  public abstract getDepreciation(depreciationId: string, type: string): Observable<DepreciationState>;

  public abstract addDepreciation(depreciationState: DepreciationState, type: string): Observable<DepreciationState>;

  public abstract updateDepreciation(depreciation: DepreciationState, type: string): Observable<number>;

  public abstract deleteDepreciation(depreciationId: string, type: string): Observable<number>;

  public abstract getDepreciationMethod(type: string, system?: string): Observable<DepreciationMethod[]>;

  public abstract getDepreciationSystem(): Observable<DepreciationSystem[]>;

  public abstract getPropertyClasses(system?: string): Observable<PropertyClass[]>;


}
