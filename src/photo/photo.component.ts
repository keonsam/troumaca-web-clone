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
  photo: Photo;
  @Input() type = 'photo';
  @Input() user: User;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() organizationName: string;
  defaultUserImage = 'https://designdroide.com/images/abstract-user-icon-4.svg';
  defaultOrganizationImage = 'https://www.desktopbackground.org/p/2015/10/22/1030276_high-quality-nature-wallpapers-free-download-desktop-wallpapers_2560x1920_h.jpg';
  constructor(private photoService: PhotoService ) {
    this.photo = new Photo();
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


  private addImage(uploadData: FormData) {
    this.photoService.addPhoto(uploadData, this.type)
      .subscribe(photo => {
        if (photo) {
          this.photoService.photoData.next(photo);
        }
      });
  }

  private updateImage(uploadData: FormData) {
    this.photoService.updatePhoto(uploadData, this.type)
      .subscribe(photo => {
        if (photo && photo.partyId) {
          this.photoService.photoData.next(photo);
        }
      });
  }

  onUpload(event: any): void {
    const selectedFile = event.target.files[0];
    const uploadData: FormData = new FormData();
    uploadData.append('image', selectedFile, selectedFile.name);
    if (this.photo.partyId) {
      this.updateImage(uploadData);
    } else {
      this.addImage(uploadData);
    }
  }

}
