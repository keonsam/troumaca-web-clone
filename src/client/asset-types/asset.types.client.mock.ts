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

// const URI_API: string = "http://localhost:3000/asset-types";
const URI_API: string = "/asset-types";

export class AssetTypesClientMock extends AssetTypesClient {



  constructor(private http: HttpClient, private uuidGenerator: UUIDGenerator) {
    super();
  }

  getAssetTypes(): Observable<AssetTypeState[]> {
    return this.http
      .get<AssetTypeState[]>(URI_API)
      .catch((error: any) => {
        return Observable.throw(error.json());
      });

  }

  public findAssetTypes(searchStr: string, pageSize:number): Observable<AssetTypeStates> {
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


}