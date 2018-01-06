import {NgModule} from "@angular/core";
import {SettingComponent} from "./setting.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports:      [
    CommonModule
  ],
  declarations: [
    SettingComponent
  ],
  exports:      [
    SettingComponent
  ],
  providers: [
  ]
})
export class SettingModule { }