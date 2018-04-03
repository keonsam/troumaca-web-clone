import * as Rx from 'rxjs';
import {PhotoRepository} from "./photo.repository";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {RepositoryKind} from "../../repository.kind";
import {photos} from "../../db";
import {Photo} from "./photo";

class PhotoDBRepository implements PhotoRepository {

  //private defaultPageSize:number = 10;

  savePhoto(partyId: string, photo:Photo):Observable<Photo> {
    let newPhoto = photo.toJson();
    return Rx.Observable.create(function(observer:Observer<Photo>) {
      photos.insert(newPhoto, function(err:any, doc:any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(photo);
        }
        observer.complete();
      });
    });
  }

  getPhotoById(partyId:string):Observable<Photo> {
    return Rx.Observable.create(function (observer:Observer<Photo>) {
      let query = {
        "partyId":partyId
      };
      photos.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  updatePhoto(partyId:string, photo:Photo):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "partyId":partyId
      };
      let newPhoto = photo.toJson();
      photos.update(query, newPhoto, {}, function (err:any, numReplaced:number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  deletePhoto(partyId:string):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "partyId":partyId
      };
      photos.remove(query, {}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

}

class PhotoRestRepository implements PhotoRepository {

  deletePhoto(partyId:string): Observable<number> {
    return undefined;
  }

  getPhotoById(partyId:string): Observable<Photo> {
    return undefined;
  }

  savePhoto(partyId: string, photo: Photo): Observable<Photo> {
    return undefined;
  }

  updatePhoto(partyId:string, photo:Photo): Observable<number> {
    return undefined;
  }
}

export function createPhotoRepository(kind?:RepositoryKind):PhotoRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new PhotoDBRepository();
    case RepositoryKind.Rest:
      return new PhotoRestRepository();
    default:
      return new PhotoDBRepository();
  }
}
