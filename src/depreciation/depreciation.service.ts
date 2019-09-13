// import {DepreciationRepository} from './depreciation.repository';
// import {Observable} from "rxjs";
// import {Asset} from "../assets/asset";
// import {Depreciation} from "./depreciation";
// import {DepreciationArr} from "./depreciation.arr";
// import {DepreciationMethod} from "./depreciation.method";
// import {DepreciationSystem} from "./depreciation.system";
// import {PropertyClass} from "./property.class";
//
// export class DepreciationService {
//
//   constructor(private depreciationRepository: DepreciationRepository) {
//   }
//
//   public findAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
//     return this.depreciationRepository.findAssets(searchStr, pageSize);
//   }
//
//   public getDepreciationArr(pageNumber: number, pageSize: number, sortOrder: string, type: string): Observable<DepreciationArr> {
//     return this.depreciationRepository.getDepreciationArr(pageNumber, pageSize, sortOrder, type);
//   }
//
//   public getDepreciation(depreciationId: string, type: string): Observable<Depreciation> {
//     return this.depreciationRepository.getDepreciation(depreciationId, type);
//   }
//
//   public addDepreciation(depreciation: Depreciation, type: string): Observable<Depreciation> {
//     return this.depreciationRepository.addDepreciation(depreciation, type);
//   }
//
//   public updateDepreciation(depreciation: Depreciation, type: string): Observable<number> {
//     return this.depreciationRepository.updateDepreciation(depreciation, type);
//   }
//
//   public deleteDepreciation(depreciationId: string, type: string): Observable<number> {
//     return this.depreciationRepository.deleteDepreciation(depreciationId, type);
//   }
//
//   public getDepreciationMethod(type: string, system?: string): Observable<DepreciationMethod[]> {
//     return this.depreciationRepository.getDepreciationMethod(type, system);
//   }
//
//   public getDepreciationSystem(): Observable<DepreciationSystem[]> {
//     return this.depreciationRepository.getDepreciationSystem();
//   }
//
//   public getPropertyClasses(system?: string): Observable<PropertyClass[]> {
//     return this.depreciationRepository.getPropertyClasses(system);
//   }
// }
