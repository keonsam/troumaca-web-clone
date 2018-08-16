import {DepreciationRepository} from './depreciation.repository';
import {Observable} from "rxjs";
import {Asset} from "../assets/asset";
import {Depreciation} from "./depreciation";
import {DepreciationArr} from "./depreciation.arr";
import {DepreciationMethod} from "./depreciation.method";

export class DepreciationService {

  constructor(private depreciationRepository: DepreciationRepository) {
  }

  public findAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
    return this.depreciationRepository.findAssets(searchStr, pageSize);
  }

  public getBookDepreciationArr(pageNumber: number, pageSize: number, sortOrder: string): Observable<DepreciationArr> {
    return this.depreciationRepository.getBookDepreciationArr(pageNumber, pageSize, sortOrder);
  }

  public getDepreciation(depreciationId: string): Observable<Depreciation> {
    return this.depreciationRepository.getDepreciation(depreciationId);
  }

  public addDepreciation(depreciation: Depreciation, type: string): Observable<Depreciation> {
    return this.depreciationRepository.addDepreciation(depreciation, type);
  }

  public updateDepreciation(depreciation: Depreciation): Observable<number> {
    return this.depreciationRepository.updateDepreciation(depreciation);
  }

  public deleteDepreciation(depreciationId: string): Observable<number> {
    return this.depreciationRepository.deleteDepreciation(depreciationId);
  }

  public getDepreciationMethod(): Observable<DepreciationMethod[]> {
    return this.depreciationRepository.getDepreciationMethod();
  }


}
