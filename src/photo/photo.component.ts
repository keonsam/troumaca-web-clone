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
  public userImage = 'https://designdroide.com/images/abstract-user-icon-4.svg';
  public organizationImage = 'https://i.pinimg.com/736x/05/19/3c/05193c43ed8e4a9ba4dfaa10ff0115f1.jpg';
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

    this.photoService.photoData.subscribe( data => {
      if (data.type === 'user') {
        this.userImage = data.imgStr;
      }else if (data.type === 'organization')  {
        this.organizationImage = data.imgStr;
      }
    });
  }

  ngOnInit(): void {
    this.getPhotos();
  }

  getPhotos() {
    this.photoService.getPhotos()
      .subscribe( photo => {
        if (photo.partyId) {
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
          this.photoService.photoData.next({type: this.type, imgStr: newPhoto.imageStr});
          this.photo = photo;
          this.modalCloseButton.nativeElement.click();
        } else {
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
          this.photoService.photoData.next({type: this.type, imgStr: newPhoto.imageStr});
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
      if (this.photo.partyId) {
        this.updateImage();
      } else {
        this.addImage();
      }
    }else {
      this.errorMessage = 'No Image Available for Update. Please Crop Your Image.';
      this.doNotDisplayFailureMessage = false;
    }
  }

}
