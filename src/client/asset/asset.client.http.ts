import {AssetClient} from './asset.client';
import {UUIDGenerator} from '../../uuid.generator';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AssetStates} from './asset.states';
import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import {AssetKindStates} from './asset.kind.states';
import {AssetState} from './asset.state';
import {AssetTypeState} from '../asset-type/asset.type.state';
import {UnitOfMeasureState} from '../unit-of-measure/unit.of.measure.state';
import {UnionOfPhysicalSiteState} from '../site/union.of.physical.site.state';
import {AssetPersonState} from './asset.person.state';

export class AssetClientHttp extends AssetClient {

  private jsonConvert: JsonConvert;

  constructor(private uuidGenerator: UUIDGenerator,
              private http: HttpClient,
              private hostPort: string) {
    super();

    this.jsonConvert = new JsonConvert();
    this.jsonConvert.operationMode = OperationMode.LOGGING; // print some debug data
    this.jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
    this.jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null
  }


  public getAssets(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetStates> {
    const url = `${this.hostPort}/assets?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<AssetStates>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getAssetState(assetId: string): Observable<AssetState> {
    const url = `${this.hostPort}/assets/${assetId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http
    .get<AssetState>(url, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public getAssetKinds(): Observable<AssetKindStates> {
    const url = `${this.hostPort}/asset-kinds`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<AssetKindStates>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public findAssetTypes(searchStr: string, pageSize: number): Observable<AssetTypeState[]> {
    const url = `${this.hostPort}/asset-types/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<AssetTypeState[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public findUnionOfPhysicalSites(searchStr: string, pageSize: number): Observable<UnionOfPhysicalSiteState[]> {
    const url = `${this.hostPort}/sites/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<UnionOfPhysicalSiteState[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasureState[]> {
    const url = `${this.hostPort}/unit-of-measures/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<UnitOfMeasureState[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public findPersons(searchStr: string, pageSize: number): Observable<AssetPersonState[]> {
    const url = `${this.hostPort}/users/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<AssetPersonState[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public addAsset(assetState: AssetState): Observable<AssetState> {
    const url = `${this.hostPort}/assets`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.post<AssetState>(url, assetState.toJson(), httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public updateAsset(assetId: string, assetState: AssetState): Observable<number> {
    const url = `${this.hostPort}/assets/${assetId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http
    .put<number>(url, assetState.toJson(), httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public deleteAsset(assetId: string): Observable<number> {
    const url = `${this.hostPort}/assets/${assetId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http
    .delete<number>(url, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public jsonHttpHeaders(): HttpHeaders {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
    return httpHeaders;
  }

}
