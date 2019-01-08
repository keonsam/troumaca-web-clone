import {Component, OnInit, Input} from '@angular/core';
import {User} from '../user';
import {PhotoService } from './photo.service';
import { Photo } from './photo';
import {ImageSnippet} from "./image.snippet";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  photo: Photo;
  selectedFile: ImageSnippet;
  @Input() type = 'photo';
  @Input() user: User;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() organizationName: string;
  defaultUserImage = 'https://source.unsplash.com/random/50x50';
  defaultOrganizationImage = 'https://source.unsplash.com/random';

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
    const file: File = event.target.files[0];
    const reader = new FileReader();
    const uploadData = new FormData();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      uploadData.append('image', this.selectedFile.file);
      if (this.photo.partyId) {
        this.updateImage(uploadData);
      } else {
        this.addImage(uploadData);
      }
    });
    reader.readAsDataURL(file);
  }

}
