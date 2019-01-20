import { NgModule } from "@angular/core";
import {CommonModule} from "@angular/common";
import {PhotoComponent} from "./photo.component";
import {photoServiceProvider} from "./photo.service.provider";
import {photoRepositoryProvider} from '../../adapter/photo/photo.repository.adapter.provider';
import {photoClientProvider} from '../../client/photo/photo.client.provider';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PhotoComponent
  ],
  providers: [
    photoServiceProvider,
    photoRepositoryProvider,
    photoClientProvider
  ],
  exports: [
    PhotoComponent
  ]
})

export class PhotoModule {}
