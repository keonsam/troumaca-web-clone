import { NgModule } from "@angular/core";
import { ImageCropperModule } from 'ngx-image-cropper';
import {CommonModule} from "@angular/common";
import {PhotoComponent} from "./photo.component";
import {photoServiceProvider} from "./photo.service.provider";

@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  declarations: [
    PhotoComponent
  ],
  providers: [photoServiceProvider],
  exports: [
    PhotoComponent
  ]
})

export class PhotoModule {}
