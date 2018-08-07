import {DepreciationClient} from "./depreciation.client";
import {UUIDGenerator} from "../../uuid.generator";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DepreciationState} from "./depreciation.state";
import {AssetState} from "../asset/asset.state";
import {DepreciationArr} from "../../depreciation/depreciation.arr";
import {map} from "underscore";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {Depreciation} from "../../depreciation/depreciation";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";
import {DepreciationStates} from "./depreciation.states";

export class DepreciationClientHttp extends DepreciationClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private http: HttpClient,
              private hostPort: string) {
    super();
  }

  public findAssets(searchStr: string, pageSize: number): Observable<AssetState[]> {
    const url = `${this.hostPort}/assets/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<AssetState[]>(url, httpOptions).map(data => {
      return data;
    });
  }

  public getDepreciationArr(pageNumber: number, pageSize: number, sortOrder: string): Observable<DepreciationStates> {
    const url = `${this.hostPort}/depreciation?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<DepreciationStates>(url, httpOptions).map(data => {
      return data;
    });
  }

  public getDepreciation(depreciationId: string): Observable<DepreciationState> {
    const url = `${this.hostPort}/depreciation/${depreciationId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<DepreciationState>(url, httpOptions).map(data => {
      return data;
    });
  }

  public addDepreciation(depreciationState: DepreciationState): Observable<DepreciationState> {
    const url = `${this.hostPort}/depreciation`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.post<DepreciationState>(url, depreciationState.toJson(), httpOptions).map(data => {
      return data;
    });
  }

  public updateDepreciation(depreciationState: DepreciationState): Observable<number> {
    const url = `${this.hostPort}/depreciation/${depreciationState.depreciationId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.put<number>(url, depreciationState.toJson(), httpOptions).map(data => {
      return data;
    });
  }

  public deleteDepreciation(depreciationId: string): Observable<number> {
    const url = `${this.hostPort}/depreciation/${depreciationId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.delete<number>(url, httpOptions).map(data => {
      return data;
    });
  }

  public jsonHttpHeaders(): HttpHeaders {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
    return httpHeaders;
  }

}
