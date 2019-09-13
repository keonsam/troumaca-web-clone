// import {Component, OnInit, Input} from '@angular/core';
// import {User} from '../user';
// import {PhotoService } from './photo.service';
// import { Photo } from './photo';
// import {ImageSnippet} from "./image.snippet";
//
// @Component({
//   selector: 'app-photo',
//   templateUrl: './photo.component.html',
//   styleUrls: ['./photo.component.css']
// })
// export class PhotoComponent implements OnInit {
//   photo: Photo;
//   selectedFile: ImageSnippet;
//   @Input() type = 'photo';
//   @Input() user: User;
//   @Input() firstName: string;
//   @Input() lastName: string;
//   @Input() organizationName: string;
//   defaultUserImage = 'https://source.unsplash.com/random/50x50';
//   defaultOrganizationImage = 'https://source.unsplash.com/random';
//
//   constructor(private photoService: PhotoService ) {
//     this.photo = new Photo();
//   }
//
//   ngOnInit(): void {
//     this.getPhotos();
//   }
//
//   getPhotos() {
//     this.photoService.photoData
//       .subscribe( photo => {
//         if (photo && photo.partyId) {
//           this.photo = photo;
//         } else {
//           this.photoService.getPhotos()
//             .subscribe( photo2 => {
//               if (photo2 && photo2.partyId) {
//                 this.photo = photo2;
//                 this.photoService.photoData.next(photo2);
//               }
//             });
//         }
//       });
//   }
//
//
//   private addImage(selectedFile: File) {
//     this.photoService.addPhoto(selectedFile, this.type)
//       .subscribe(photo => {
//         if (photo && photo.photoId) {
//           this.photoService.photoData.next(photo);
//         }
//       });
//   }
//
//   private updateImage(selectedFile: File) {
//     this.photoService.updatePhoto(selectedFile, this.type, this.photo.photoId)
//       .subscribe(photo => {
//         if (photo && photo.photoId) {
//           this.photoService.photoData.next(photo);
//         }
//       });
//   }
//
//   onUpload(imageInput: any): void {
//     const file: File = imageInput.files[0];
//     const reader = new FileReader();
//     reader.addEventListener('load', (event: any) => {
//       this.selectedFile = new ImageSnippet(event.target.result, file);
//       if (this.photo.photoId) {
//         this.updateImage(this.selectedFile.file);
//       } else {
//         this.addImage(this.selectedFile.file);
//       }
//     });
//     reader.readAsDataURL(file);
//   }
//
// }
