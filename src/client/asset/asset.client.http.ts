import {AssetClient} from './asset.client';
import {UUIDGenerator} from '../../uuid.generator';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Assets} from '../../assets/assets';
import {Asset} from '../../assets/asset';
import {environment} from '../../environments/environment';
import {AssetType} from '../../asset-types/asset.type';
import {Brand} from '../../brands/brand';

export class AssetClientHttp extends AssetClient {

  hostPort = environment.hostPort;

  constructor(private uuidGenerator: UUIDGenerator,
              private http: HttpClient) {
    super();
  }


  getAssets(pageNumber: number, pageSize: number, sortOrder: string): Observable<Assets> {
    const url = `${this.hostPort}/assets?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<Assets>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  getAsset(assetId: string): Observable<Asset> {
    const url = `${this.hostPort}/assets/${assetId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http
      .get<Asset>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  addAsset(assetState: Asset): Observable<Asset> {
    const url = `${this.hostPort}/assets`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.post<Asset>(url, assetState, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  updateAsset(assetId: string, assetState: Asset): Observable<number> {
    const url = `${this.hostPort}/assets/${assetId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http
      .put<number>(url, assetState, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteAsset(assetId: string): Observable<number> {
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

  // OTHERS


  findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
    const url = `${this.hostPort}/asset-types/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<AssetType[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  findBrands(searchStr: string, pageSize: number): Observable<Brand[]> {
    const url = `${this.hostPort}/brands/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<Brand[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  private jsonHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
  }

}
