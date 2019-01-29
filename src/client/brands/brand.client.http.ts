import {environment} from '../../environments/environment';
import {UUIDGenerator} from '../../uuid.generator';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BrandClient} from './brand.client';
import {Observable} from 'rxjs';
import {Brands} from '../../brands/brands';
import {Brand} from '../../brands/brand';
import {map} from 'rxjs/operators';

export class BrandClientHttp extends BrandClient {

  hostPort = environment.hostPort;
  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient) {
    super();
  }

  getBrands(pageNumber: number, pageSize: number, sortOrder: string): Observable<Brands> {
    const url = `${this.hostPort}/brands?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Brands>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  getBrand(brandId: string): Observable<Brand> {
    const url = `${this.hostPort}/brands/${brandId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Brand>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  addBrand(brand: Brand): Observable<Brand> {
    const url = `${this.hostPort}/brands`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<Brand>(url, brand, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  updateBrand(brand: Brand): Observable<number> {
    const url = `${this.hostPort}/brands/${brand.brandId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.put<number>(url, brand, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  deleteBrand(brandId: string): Observable<number> {
    const url = `${this.hostPort}/brands/${brandId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.delete<number>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  private jsonHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
  }
}
