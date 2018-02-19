import {AssetTypesClient} from "./asset.types.client";
import {Observable} from "rxjs/Observable";
import {AssetTypeState} from "./asset.type.state";
import {AssetTypeClassState} from "./asset.type.class.state";
import "rxjs/add/observable/of";
import {AttributeState} from "./attribute.state";
import {UUIDGenerator} from "../../uuid.generator";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {AssetTypeStates} from "./asset.type.states";
import {AttributeStates} from "../attribute/attribute.states";
import {AssetTypeClassStates} from "../asset-type-class/asset.type.class.states";
import {ValueState} from "./value.state";
import {ValueStates} from "./value.states";
// const URI_API: string = "http://localhost:3000/asset-types";
const URI_API: string = "/asset-types";

export class AssetTypesClientMock extends AssetTypesClient {



  constructor(private http: HttpClient, private uuidGenerator: UUIDGenerator) {
    super();
  }

  public getAssetTypes(pageNumber:number, pageSize:number, sortOrder:string): Observable<AssetTypeStates> {
    return null;
  }

  public getAttributes(assetTypeClassId: string): Observable<AttributeStates> {
    return null;
  }

  public getValues(assetTypeId: string): Observable<ValueStates> {
    return null;
  }

  public getAssetTypeState(assetTypeId: string): Observable<AssetTypeState> {
    return null;
  }

  public findAssetTypes(searchStr: string, pageSize:number): Observable<AssetTypeStates> {
    return null;
  }

  public findAssetTypeClassId(searchStr: string, pageSize: number): Observable<AssetTypeClassStates> {
    return null;
  }

  public addAssetTypeState(assetTypeState: AssetTypeState): Observable<AssetTypeState> {
    return null;
  }

  public addValueState(value: ValueState): Observable<ValueState> {
    return null;
  }

  private createAssetTypeClass():AssetTypeClassState {
    let assetTypeClassState:AssetTypeClassState = new AssetTypeClassState();
    assetTypeClassState.assetTypeClassId = this.uuidGenerator.generateUUID();
    assetTypeClassState.name = "";
    assetTypeClassState.description = "";
    return assetTypeClassState;
  }

  private createAssetTypeAttribute():AttributeState {
    let assetTypeAttributeState:AttributeState = new AttributeState();
    return assetTypeAttributeState;
  }

  public deleteAssetType(assetTypeId: string): Observable<number> {
   return null;
  }

  public deleteValue(valueId: string): Observable<number> {
    return null;
  }

  public updateAssetType(assetTypeId: string, assetTypeState: AssetTypeState): Observable<number> {
    return null;
  }

  public updateValue(valueState: ValueState): Observable<number> {
    return null;
  }

}
