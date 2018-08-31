import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DepreciationComponent} from './depreciation.component';
import {depreciationServiceProvider} from './depreciation.service.provider';
import {Ng2CompleterModule} from 'ng2-completer';
import {PagingModule} from '../paging/paging.module';
import { BookCreationComponent} from './book/book-creation/book.creation.component';
import { BookScheduleComponent } from './book/book-schedule/book.schedule.component';
import { BookEditComponent } from './book/book-edit/book.edit.component';
import { TaxCreationComponent } from './tax/tax-creation/tax.creation.component';
import { TaxScheduleComponent } from './tax/tax-schedule/tax.schedule.component';
import { TaxEditComponent } from './tax/tax-edit/tax.edit.component';
import { DepreciationRoutingModule } from "./depreciation.routing.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MenuModule,
    Ng2CompleterModule,
    ReactiveFormsModule,
    PagingModule,
    DepreciationRoutingModule
  ],
  declarations: [
    DepreciationComponent,
    BookCreationComponent,
    BookScheduleComponent,
    BookEditComponent,
    TaxCreationComponent,
    TaxScheduleComponent,
    TaxEditComponent
  ],
  providers: [depreciationServiceProvider],
  exports: [
    // DepreciationComponent,
    // BookCreationComponent,
    // BookScheduleComponent,
    // BookEditComponent,
    // TaxCreationComponent,
    // TaxScheduleComponent,
    // TaxEditComponent
  ]
})

export class DepreciationModule {}
