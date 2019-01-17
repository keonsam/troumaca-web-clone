import {AssetClient} from './asset.client';
import {UUIDGenerator} from '../../uuid.generator';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Assets} from '../../assets/assets';
import {Asset} from '../../assets/asset';
import {AssetSpecification} from "../../assets/asset.specification";
import {AssetBrand} from "../../assets/asset.brand";
import {AssetCharacteristics} from "../../assets/asset.characteristics";
import {environment} from '../../environments/environment';

export class AssetClientHttp extends AssetClient {

  hostPort = environment.hostPort;
  constructor(private uuidGenerator: UUIDGenerator,
              private http: HttpClient) {
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

  getAssetSpecById(assetId: string): Observable<AssetSpecification> {
    const url = `${this.hostPort}/asset-specifications/${assetId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http
      .get<AssetSpecification>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getAssetBrandById(assetId: string): Observable<AssetBrand> {
    const url = `${this.hostPort}/asset-brands/${assetId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http
      .get<AssetBrand>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getAssetCharacteristicsById(assetId: string): Observable<AssetCharacteristics> {
    const url = `${this.hostPort}/asset-characteristics/${assetId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http
      .get<AssetCharacteristics>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }
  

  public addAsset(assetState: Asset): Observable<Asset> {
    const url = `${this.hostPort}/assets`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.post<Asset>(url, assetState, httpOptions).pipe(map(data => {
      return data;
    }));
  }


  public addAssetSpec(assetModel: AssetSpecification): Observable<AssetSpecification> {
    const url = `${this.hostPort}/asset-specifications`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.post<AssetSpecification>(url, assetModel, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public addAssetBrand(assetModel: AssetBrand): Observable<AssetBrand> {
    const url = `${this.hostPort}/asset-brands`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.post<AssetBrand>(url, assetModel, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public addAssetCharacteristics(assetModel: AssetCharacteristics): Observable<AssetCharacteristics> {
    const url = `${this.hostPort}/asset-characteristics`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.post<AssetCharacteristics>(url, assetModel, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public updateAsset(assetId: string, assetState: Asset): Observable<number> {
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


  public findAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
    const url = `${this.hostPort}/assets/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.http.get<Asset[]>(url, httpOptions).pipe(map(data => {
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
