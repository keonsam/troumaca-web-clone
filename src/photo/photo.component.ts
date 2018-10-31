import {Component, OnInit, Input} from '@angular/core';
import {User} from '../parties/user';
import {PhotoService } from './photo.service';
import { Photo } from './photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  private selectedImage: File;
  photo: Photo;
  @Input() type = 'photo';
  @Input() user: User;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() organizationName: string;

  constructor(private photoService: PhotoService ) {
    this.photo = new Photo();
    this.photo.userImage = 'https://designdroide.com/images/abstract-user-icon-4.svg';
    this.photo.organizationImage = 'https://i.pinimg.com/736x/05/19/3c/05193c43ed8e4a9ba4dfaa10ff0115f1.jpg';

  }

  ngOnInit(): void {
    this.getPhotos();
  }

  getPhotos() {
    this.photoService.photoData
      .subscribe( photo => {
        if (photo && photo.partyId) {
          this.photo = photo;
        } else {
          this.photoService.getPhotos()
            .subscribe( photo2 => {
              if (photo2 && photo2.partyId) {
                this.photo = photo2;
                this.photoService.photoData.next(photo2);
              }
            });
        }
      });
  }

  fileChangeEvent(event: any): void {
    this.selectedImage = event.target.files[0];
    this.onUpload();
  }

  private addImage() {
    this.photoService.addPhoto(this.selectedImage, this.type)
      .subscribe(photo => {
        if (photo) {
          this.photoService.photoData.next(photo);
        }
      });
  }

  private updateImage() {
    this.photoService.updatePhoto(this.selectedImage, this.type)
      .subscribe(numUpdated => {
        if (numUpdated) {
          if (this.type === 'user') {
            this.photo.userImage = this.selectedImage;
          } else {
            this.photo.organizationImage = this.selectedImage;
          }
          this.photoService.photoData.next(this.photo);
        }
      });
  }

  private onUpload() {
    if (this.photo.partyId) {
      this.updateImage();
    } else {
      this.addImage();
    }
  }

}
