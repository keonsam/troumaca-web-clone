import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DepreciationComponent} from './depreciation.component';
import {depreciationServiceProvider} from './depreciation.service.provider';
import {Ng2CompleterModule} from 'ng2-completer';
import {PagingModule} from '../paging/paging.module';
import { BookScheduleComponent } from './book/book-schedule/book.schedule.component';
import { TaxScheduleComponent } from './tax/tax-schedule/tax.schedule.component';
import { DepreciationRoutingModule } from "./depreciation.routing.module";
import { BookFormComponent } from "./book/book-form/book.form.component";
import { depreciationBookResolveProvider } from "./depreciation.book.resolve.provider";
import { TaxFormComponent } from "./tax/tax-form/tax.form.component";
import { depreciationTaxResolveProvider } from "./depreciation.tax.resolve.provider";
import {authGuardProvider} from "../auth-guard/auth.guard.provider";

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
    BookScheduleComponent,
    BookFormComponent,
    TaxFormComponent,
    TaxScheduleComponent,
  ],
  providers: [depreciationServiceProvider, depreciationBookResolveProvider, depreciationTaxResolveProvider, authGuardProvider],
  exports: []
})

export class DepreciationModule {}
