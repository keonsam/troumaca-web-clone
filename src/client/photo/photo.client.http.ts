import {PhotoClient} from './photo.client';
import {UUIDGenerator} from '../../uuid.generator';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { PhotoState } from './photo.state';
import {map} from 'rxjs/operators';

export class PhotoClientHttp implements PhotoClient {
  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
  }

  public getPhotos(type?: string): Observable<PhotoState> {
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

  public addPhoto(photoState: PhotoState, type: string): Observable<PhotoState> {
    const url = `${this.hostPort}/photos/${type}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .post<PhotoState>(url, photoState.toJson(), httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public updatePhoto(photoState: PhotoState, type: string): Observable<number> {
    const url = `${this.hostPort}/photos/${type}/${photoState.partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .put<number>(url, photoState.toJson(), httpOptions)
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
