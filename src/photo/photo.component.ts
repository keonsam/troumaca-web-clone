import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {User} from '../parties/user';
import {PhotoService } from "./photo.service";
import { Photo } from "./photo";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  public userImage: string;
  public organizationImage: string;
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public doNotDisplayFailureMessage = true;
  public errorMessage = '';
  private photo: Photo;
  @Input() type = 'photo';
  @Input() user: User;
  @Input() organizationName: string;
  @ViewChild('modalCloseButton') private modalCloseButton: ElementRef;


  constructor(private photoService: PhotoService ) {
    this.photo = new Photo();
  }

  ngOnInit(): void {
    this.getPhotos();
  }

  getPhotos() {
    this.photoService.getPhotos()
      .subscribe( photo => {
        if (photo) {
          this.userImage = photo.userImage;
          this.organizationImage = photo.organizationImage;
          this.photo = photo;
        }
      });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }

  imageLoaded() {
    this.doNotDisplayFailureMessage = true;
    // show cropper
  }

  loadImageFailed() {
    this.errorMessage = 'Failed to Load Image, Please Try Again.';
    this.doNotDisplayFailureMessage = false;
    // show message
  }

  addImage() {
    const newPhoto = new Photo();
    newPhoto.imageStr = this.croppedImage;
    this.photoService.addPhoto(newPhoto, this.type)
      .subscribe(photo => {
        if (photo) {
          if (this.type === 'organization') {
            this.organizationImage = photo.imageStr;
          }else {
            this.userImage = photo.imageStr;
          }
          this.photo = photo;
          this.modalCloseButton.nativeElement.click();
        }else {
          this.errorMessage = 'Failed to Add Image to Server, Please Type Again.';
          this.doNotDisplayFailureMessage = false;
        }
      })
  }

  updateImage() {
    const newPhoto = new Photo();
    newPhoto.partyId = this.photo.partyId;
    newPhoto.imageStr = this.croppedImage;
    this.photoService.updatePhoto(newPhoto, this.type)
      .subscribe(photo => {
        if (photo) {
          this.getPhotos();
          this.modalCloseButton.nativeElement.click();
        }else {
          this.errorMessage = 'Failed to Update Image, Please Type Again.';
          this.doNotDisplayFailureMessage = false;
        }
      })
  }

  onUpload() {
    this.doNotDisplayFailureMessage = true;
    if (this.croppedImage) {
      if (this.type === 'organization' && !this.organizationImage) {
        this.addImage();
      }else if (this.type === 'user' && !this.userImage) {
        this.addImage();
      }else {
        this.updateImage();
      }
    }else {
      this.errorMessage = 'No Image Available for Update. Please Crop Your Image.';
      this.doNotDisplayFailureMessage = false;
    }
  }

}
