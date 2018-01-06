import {NgModule} from "@angular/core";
import {PageNumberSelectionComponent} from "./page-number-selection/page.number.selection.component";
import {PageSizeComponent} from "./page-size/page.size.component";
import {ShowingComponent} from "./showing/showing.component";
import {PagingComponent} from "./paging.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports:      [
    CommonModule
  ],
  declarations: [
    PageNumberSelectionComponent,
    PageSizeComponent,
    ShowingComponent,
    PagingComponent
  ],
  exports:      [
    PageNumberSelectionComponent,
    PageSizeComponent,
    ShowingComponent,
    PagingComponent
  ],
  providers: [
  ]
})
export class PagingModule { }