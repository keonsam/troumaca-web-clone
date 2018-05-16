import {createAssetRepository} from './asset.repository.factory';
import {shapeAssetsResponse} from "./asset.response.shaper";
import {getSortOrderOrDefault} from '../../sort.order.util';
import {AssetRepository} from "./asset.repository";
import {Observable} from "rxjs/Observable";
//import { forkJoin } from "rxjs/observable/forkJoin";
import {Asset} from "./asset";
import {AssetKind} from "../kind/asset.kind";
import {AssetType} from "../asset.type";
import {UnitOfMeasure} from "../../unit-of-measure/unit.of.measure";
import {Person} from "../../party/person/person";
import {Site} from "../../site/site";
import {Result} from "../../result.success";

import {AssetTypeRepository} from "../asset.type.repository";
import {createAssetTypeRepository} from "../asset.type.repository.factory";
import {AssetKindRepository} from "../kind/asset.kind.repository";
import {createAssetKindRepository} from "../kind/asset.kind.repository.factory";
import {UnitOfMeasureRepository} from "../../unit-of-measure/unit.of.measure.repository";
import {createUnitOfMeasureRepository} from "../../unit-of-measure/unit.of.measure.repository.factory";
import {UserRepository} from "../../party/user/user.repository";
import {createUserRepository} from "../../party/user/user.repository.factory";
import {SiteRepository} from "../../site/site.repository";
import {createSiteRepository} from "../../site/site.repository.factory";

export class AssetOrchestrator {

  private assetRepository:AssetRepository;
  private assetTypeRepository:AssetTypeRepository;
  private assetKindRepository:AssetKindRepository;
  private unitOfMeasureRepository:UnitOfMeasureRepository;
  private userRepository:UserRepository;
  private siteRepository:SiteRepository;

  constructor(options?:any) {
    this.assetRepository = createAssetRepository(options);
    this.assetTypeRepository = createAssetTypeRepository(options);
    this.assetKindRepository = createAssetKindRepository(options);
    this.unitOfMeasureRepository = createUnitOfMeasureRepository(options);
    this.userRepository = createUserRepository(options);
    this.siteRepository = createSiteRepository(options);
  }

  saveAsset(asset:Asset):Observable<Asset> {
    return this.assetRepository.saveAsset(asset);
  };

  getAssetCount():Observable<number> {
    return this.assetRepository.getAssetCount();
  }

  getAssets(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort: string = getSortOrderOrDefault(field, direction);
    return this.assetRepository
      .getAssets(number, size, sort)
      .switchMap((assets: Asset[]) => {
        if (assets.length === 0) {
          let shapeAssetsResp: any = shapeAssetsResponse(assets, 0, 0, 0, 0, sort);
          return Observable.of(new Result<any>(false, "no data found", shapeAssetsResp));
        } else {
           let assetKindIds:string[] = assets.map(x => {
             if (x.assetKindId) return x.assetKindId;
           });
           return this.assetKindRepository.getAssetKindByIds(assetKindIds)
             .switchMap((assetKinds: AssetKind[]) => {
               assets.forEach(value => {
                 let index = assetKinds.findIndex(x => x.assetKindId === value.assetKindId);
                 value.assetKind = assetKinds[index];
               });
               let assetTypeIds:string[] = assets.map(x => {
                 if (x.assetTypeId) return x.assetTypeId;
               });
               return this.assetTypeRepository.getAssetTypeByIds(assetTypeIds)
                 .switchMap((assetTypes: AssetType[]) => {
                   assets.forEach(value => {
                     let index = assetTypes.findIndex(x => x.assetTypeId === value.assetTypeId);
                     value.assetType = assetTypes[index];
                   });
                   let unitOfMeasureIds:string[] = assets.map(x => {
                     if (x.unitOfMeasureId) return x.unitOfMeasureId;
                   });
                   return this.unitOfMeasureRepository.getUnitOfMeasureByIds(unitOfMeasureIds)
                     .switchMap((unitOfMeasures: UnitOfMeasure[]) => {
                       assets.forEach(value => {
                         let index = unitOfMeasures.findIndex(x => x.unitOfMeasureId === value.unitOfMeasureId);
                         value.unitOfMeasure = unitOfMeasures[index];
                       });
                       let personIds:string[] = assets.map(x => {
                         if (x.personId) return x.personId;
                       });
                       return this.userRepository.getPersonByIds(personIds)
                         .switchMap((persons:Person[]) => {
                           assets.forEach(value => {
                             let index = persons.findIndex(x => x.partyId === value.personId);
                             value.person = persons[index];
                           });
                           let siteIds:string[] = assets.map(x => {
                             if (x.siteId) return x.siteId;
                           });
                           return this.siteRepository.getSiteByIds(siteIds)
                             .switchMap((sites: Site[]) => {
                               assets.forEach(value => {
                                 let index = sites.findIndex(x => x.siteId === value.siteId);
                                 value.site = sites[index];
                               });
                               return this.assetRepository
                                 .getAssetCount()
                                 .map(count => {
                                   let shapeAssetsResp:any = shapeAssetsResponse(assets, number, size, assets.length, count, sort);
                                   return new Result<any>(false, "assets", shapeAssetsResp);
                                 });
                             });
                         });
                     });
                 });
             });
        }
      });
  }

  getAssetById(assetId:string):Observable<Asset> {
    return this.assetRepository.getAssetById(assetId)
      .switchMap( (asset: Asset) => {
        if(!asset) {
          return Observable.of(new Asset());
        }else {
          return this.assetKindRepository.getAssetKindById(asset.assetKindId)
            .switchMap( assetKind => {
              if(assetKind) {
                asset.assetKind = assetKind;
              }
              return this.assetTypeRepository.getAssetTypeById(asset.assetTypeId)
                .switchMap( assetType => {
                  if(assetType){
                    asset.assetType = assetType;
                  }
                  return this.unitOfMeasureRepository.getUnitOfMeasureById(asset.unitOfMeasureId)
                    .switchMap(unitOfMeasure => {
                      if(unitOfMeasure) {
                        asset.unitOfMeasure = unitOfMeasure;
                      }
                      return this.userRepository.getPerson(asset.personId)
                        .switchMap(person => {
                          if(person) {
                            asset.person = person;
                          }
                          return this.siteRepository.getSiteById(asset.siteId)
                            .map(site => {
                              if(site) {
                                asset.site = site;
                              }
                              return asset;
                            });
                        });
                    });
                });
            });
        }
      });
  }

  updateAsset(assetId:string, asset:Asset):Observable<number> {
    return this.assetRepository.updateAsset(assetId, asset);
  }

  deleteAsset(assetId:string):Observable<number> {
    return this.assetRepository.deleteAsset(assetId);
  }

}

