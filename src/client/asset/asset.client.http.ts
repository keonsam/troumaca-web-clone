import {AssetClient} from './asset.client';
import {UUIDGenerator} from '../../uuid.generator';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Assets} from '../../assets/assets';
import {Asset} from '../../assets/asset';
import {AssetKinds} from '../../assets/asset.kinds';
import {AssetType} from '../../asset-types/asset.type';
import {Site} from '../../site/site';
import {User} from '../../parties/user';

export class AssetClientHttp extends AssetClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private http: HttpClient,
              private hostPort: string) {
    super();
  }


  public getAssets(pageNumber: number, pageSize: number, sortOrder: string): Observable<Assets> {
    const url = `${this.hostPort}/assets?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<Assets>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getAsset(assetId: string): Observable<Asset> {
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

  public addAsset(assetState: Asset): Observable<Asset> {
    const url = `${this.hostPort}/assets`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.post<Asset>(url, assetState.toJson(), httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public updateAsset(assetId: string, assetState: Asset): Observable<number> {
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

  // OTHERS

  public getAssetKinds(): Observable<AssetKinds> {
    const url = `${this.hostPort}/asset-kinds`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<AssetKinds>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
    const url = `${this.hostPort}/asset-types/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<AssetType[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public findUnionOfPhysicalSites(searchStr: string, pageSize: number): Observable<Site[]> {
    const url = `${this.hostPort}/sites/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<Site[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public findPersons(searchStr: string, pageSize: number): Observable<User[]> {
    const url = `${this.hostPort}/users/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<User[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public jsonHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
  }

}
