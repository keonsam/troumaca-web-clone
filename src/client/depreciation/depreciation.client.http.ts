import {DepreciationClient} from "./depreciation.client";
import {UUIDGenerator} from "../../uuid.generator";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DepreciationState} from "./depreciation.state";
import {AssetState} from "../asset/asset.state";
import {DepreciationStates} from "./depreciation.states";
import {DepreciationMethod} from "../../depreciation/depreciation.method";

export class DepreciationClientHttp extends DepreciationClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private http: HttpClient,
              private hostPort: string) {
    super();
  }

  public findAssets(searchStr: string, pageSize: number): Observable<AssetState[]> {
    const url = `${this.hostPort}/depreciation/assets/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<AssetState[]>(url, httpOptions).map(data => {
      return data;
    });
  }

  public getBookDepreciationArr(pageNumber: number, pageSize: number, sortOrder: string): Observable<DepreciationStates> {
    const url = `${this.hostPort}/book-depreciation?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
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

  public addDepreciation(depreciationState: DepreciationState, type: string): Observable<DepreciationState> {
    const url = `${this.hostPort}/depreciation`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    const body = {
      depreciation: depreciationState.toJson(),
      type: type};
    return this.http.post<DepreciationState>(url, body, httpOptions).map(data => {
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

  public getDepreciationMethod(): Observable<DepreciationMethod[]> {
    const url = `${this.hostPort}/depreciation-methods`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<DepreciationMethod[]>(url, httpOptions).map(data => {
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
