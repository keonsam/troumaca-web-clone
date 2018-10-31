import {PhotoClient} from './photo.client';
import {UUIDGenerator} from '../../uuid.generator';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Photo} from "../../photo/photo";

export class PhotoClientHttp implements PhotoClient {
  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
  }

  public getPhotos(type?: string): Observable<Photo> {
    const url = `${this.hostPort}/photos?type=${type}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .get<any>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public addPhoto(photoState: File, type: string): Observable<Photo> {
    const url = `${this.hostPort}/photos/${type}`;
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'image/*',
      'correlationId': this.uuidGenerator.generateUUID()
    });
    return this.httpClient
      .post<Photo>(url, photoState, {headers: httpHeaders})
      .pipe(map(data => {
        return data;
      }));
  }

  public updatePhoto(photoState: File, type: string): Observable<number> {
    const url = `${this.hostPort}/photos/${type}`;
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'image/*',
      'correlationId': this.uuidGenerator.generateUUID()
    });
    return this.httpClient
      .put<number>(url, photoState, {headers: httpHeaders})
      .pipe(map(data => {
        return data;
      }));
  }

  private jsonHttpHeaders(): HttpHeaders {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
    return httpHeaders;
  }

}
