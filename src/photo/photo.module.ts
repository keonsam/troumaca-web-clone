import { NgModule } from "@angular/core";
import {CommonModule} from "@angular/common";
import {PhotoComponent} from "./photo.component";
import {photoServiceProvider} from "./photo.service.provider";

@NgModule({
  imports: [
    CommonModule
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
