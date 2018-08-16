import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import { ReactiveFormsModule } from '@angular/forms';
import {DepreciationComponent} from "./depreciation.component";
// import {BookScheduleComponent} from "./book/book-schedule/book.schedule.component";
import {depreciationServiceProvider} from "./depreciation.service.provider";
import {Ng2CompleterModule} from "ng2-completer";
import {PagingModule} from "../paging/paging.module";
// import {DepreciationEditComponent} from './book/book-edit/depreciation.edit.component';
import { BookCreationComponent} from "./book/book-creation/book.creation.component";
import { BookScheduleComponent } from "./book/book-schedule/book.schedule.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    Ng2CompleterModule,
    ReactiveFormsModule,
    PagingModule
  ],
  declarations: [
    DepreciationComponent,
    BookCreationComponent,
    // DepreciationEditComponent,
    BookScheduleComponent
  ],
  providers: [depreciationServiceProvider],
  exports: [
    DepreciationComponent,
    BookCreationComponent,
    // DepreciationEditComponent,
    BookScheduleComponent
  ]
})

export class DepreciationModule {}
