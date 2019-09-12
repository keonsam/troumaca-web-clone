// import {BehaviorSubject, Observable} from "rxjs";
// import {Photo} from "./photo";
// import {PhotoRepository} from "./photo.repository";
//
// export class PhotoService {
//
//   public photoData = new BehaviorSubject<Photo>(new Photo());
//
//   constructor(private photoRepository: PhotoRepository) {}
//
//   public getPhotos(type?: string): Observable<Photo> {
//     return this.photoRepository.getPhotos(type);
//   }
//
//   public addPhoto(photo: File, type: string): Observable<Photo> {
//     return this.photoRepository.addPhoto(photo, type);
//   }
//
//   public updatePhoto(photo: File, type: string, photoId: string): Observable<Photo> {
//     return this.photoRepository.updatePhoto(photo, type, photoId);
//   }
// }
