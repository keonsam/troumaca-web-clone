import {environment} from '../../environments/environment';
import {UUIDGenerator} from '../../uuid.generator';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AssetCharacteristicClient} from './asset.characteristic.client';
import {Observable} from 'rxjs';
import {AssetCharacteristics} from '../../asset-characteristics/asset.characteristics';
import {AssetCharacteristic} from '../../asset-characteristics/asset.characteristic';
import {map} from 'rxjs/operators';
import {Type} from '../../asset-characteristics/type';
import {UnitOfMeasure} from '../../unit-of-measure/unit.of.measure';

export class AssetCharacteristicClientHttp extends AssetCharacteristicClient {

  hostPort = environment.hostPort;

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient) {
    super();
  }

  getAssetCharacteristics(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetCharacteristics> {
    const url = `${this.hostPort}/assetCharacteristics?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AssetCharacteristics>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  getAssetCharacteristic(assetCharacteristicId: string): Observable<AssetCharacteristic> {
    const url = `${this.hostPort}/assetCharacteristics/${assetCharacteristicId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AssetCharacteristic>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  addAssetCharacteristic(assetCharacteristic: AssetCharacteristic): Observable<AssetCharacteristic> {
    const url = `${this.hostPort}/assetCharacteristics`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<AssetCharacteristic>(url, assetCharacteristic, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  updateAssetCharacteristic(assetCharacteristic: AssetCharacteristic): Observable<number> {
    const url = `${this.hostPort}/assetCharacteristics/${assetCharacteristic.assetCharacteristicId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.put<number>(url, assetCharacteristic, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  deleteAssetCharacteristic(assetCharacteristicId: string): Observable<number> {
    const url = `${this.hostPort}/assetCharacteristics/${assetCharacteristicId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.delete<number>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  // OTHERS

  getTypes(): Observable<Type[]> {
    const url = `${this.hostPort}/assetCharacteristics/types`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Type[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
    const url = `${this.hostPort}/unit-of-measures/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<UnitOfMeasure[]>(url, httpOptions).pipe(map(data => {
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
