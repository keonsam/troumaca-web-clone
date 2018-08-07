import {DepreciationRepository} from './depreciation.repository';
import {Observable} from "rxjs";
import {Asset} from "../assets/asset";
import {Depreciation} from "./depreciation";
import {DepreciationArr} from "./depreciation.arr";

export class DepreciationService {

  constructor(private depreciationRepository: DepreciationRepository) {
  }

  public findAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
    return this.depreciationRepository.findAssets(searchStr, pageSize);
  }

  public getDepreciationArr(pageNumber: number, pageSize: number, sortOrder: string): Observable<DepreciationArr> {
    return this.depreciationRepository.getDepreciationArr(pageNumber, pageSize, sortOrder);
  }

  public getDepreciation(depreciationId: string): Observable<Depreciation> {
    return this.depreciationRepository.getDepreciation(depreciationId);
  }

  public addDepreciation(depreciation: Depreciation): Observable<Depreciation> {
    return this.depreciationRepository.addDepreciation(depreciation);
  }

  public updateDepreciation(depreciation: Depreciation): Observable<number> {
    return this.depreciationRepository.updateDepreciation(depreciation);
  }

  public deleteDepreciation(depreciationId: string): Observable<number> {
    return this.depreciationRepository.deleteDepreciation(depreciationId);
  }


}
