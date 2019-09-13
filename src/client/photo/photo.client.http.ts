// import {PhotoClient} from './photo.client';
// import {UUIDGenerator} from '../../uuid.generator';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {Observable} from 'rxjs';
// import {map} from 'rxjs/operators';
// import {Photo} from "../../parties/photo/photo";
// import {environment} from '../../environments/environment';
//
// export class PhotoClientHttp implements PhotoClient {
//   hostPort = environment.hostPort;
//   constructor(private uuidGenerator: UUIDGenerator,
//               private httpClient: HttpClient) {
//   }
//
//   public getPhotos(type?: string): Observable<Photo> {
//     const url = `${this.hostPort}/photos?type=${type}`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient
//       .get<any>(url, httpOptions)
//       .pipe(map(data => {
//         return data;
//       }));
//   }
//
//   public addPhoto(photoState: File, type: string): Observable<Photo> {
//     const url = `${this.hostPort}/photos/${type}`;
//     const formData = new FormData();
//
//     formData.append('image', photoState, photoState.name);
//     const httpHeaders: HttpHeaders = new HttpHeaders({
//       'Content-Type':  'multipart/form-data',
//       'correlationId': this.uuidGenerator.generateUUID()
//     });
//     return this.httpClient
//       .post<Photo>(url, formData, {headers: httpHeaders})
//       .pipe(map(data => {
//         return data;
//       }));
//   }
//
//   public updatePhoto(photoState: File, type: string, photoId: string): Observable<Photo> {
//     const url = `${this.hostPort}/photos/${type}/${photoId}`;
//     const formData = new FormData();
//
//     formData.append('image', photoState);
//     const httpHeaders: HttpHeaders = new HttpHeaders({
//       'Content-Type':  'multipart/form-data',
//       'correlationId': this.uuidGenerator.generateUUID()
//     });
//     return this.httpClient
//       .put<Photo>(url, formData, {headers: httpHeaders})
//       .pipe(map(data => {
//         return data;
//       }));
//   }
//
//   private jsonHttpHeaders(): HttpHeaders {
//     const httpHeaders: HttpHeaders = new HttpHeaders({
//       'Content-Type':  'application/json',
//       'correlationId': this.uuidGenerator.generateUUID()
//     });
//     return httpHeaders;
//   }
//
// }
