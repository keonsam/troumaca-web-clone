import {AssetTypesClient} from "./asset.types.client";
import {Observable} from "rxjs/Observable";
import {AssetTypeState} from "./asset.type.state";
import {AssetTypeClassState} from "./asset.type.class.state";
import "rxjs/add/observable/of";
import {AssetTypeAttributeState} from "./asset.type.attribute.state";
import {AssetTypeAttributeValueState} from "./asset.type.attribute.value.state";
import {UUIDGenerator} from "../../uuid.generator";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

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

  private createAssetTypeClass():AssetTypeClassState {
    let assetTypeClassState:AssetTypeClassState = new AssetTypeClassState();
    assetTypeClassState.assetTypeClassId = this.uuidGenerator.generateUUID();
    assetTypeClassState.name = "";
    assetTypeClassState.description = "";
    return assetTypeClassState;
  }

  private createAssetTypeAttribute():AssetTypeAttributeState {
    let assetTypeAttributeState:AssetTypeAttributeState = new AssetTypeAttributeState();
    return assetTypeAttributeState;
  }

  private createAssetTypeAttributeValue():AssetTypeAttributeValueState {
    let assetTypeAttributeValueState:AssetTypeAttributeValueState = new AssetTypeAttributeValueState();
    return assetTypeAttributeValueState;
  }



}