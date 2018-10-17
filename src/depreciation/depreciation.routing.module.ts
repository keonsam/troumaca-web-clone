import {Routes, RouterModule} from '@angular/router';
import {NgModule} from "@angular/core";
import {DepreciationComponent} from "./depreciation.component";
import {BookScheduleComponent} from "./book/book-schedule/book.schedule.component";
import { BookFormComponent } from "./book/book-form/book.form.component";
import {TaxScheduleComponent} from "./tax/tax-schedule/tax.schedule.component";
import {DepreciationBookResolve} from "./depreciation.book.resolve";
import { TaxFormComponent } from "./tax/tax-form/tax.form.component";
import {DepreciationTaxResolve} from "./depreciation.tax.resolve";
import {AuthGuard} from "../auth-guard/auth.guard";

export const routes: Routes = [
  { path: '', component: DepreciationComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: '/depreciation/book/schedule', pathMatch: 'full' },
      { path: 'book/schedule', component: BookScheduleComponent },
      { path: 'book/create', component: BookFormComponent},
      { path: 'book/:depreciationId/edit', component: BookFormComponent, resolve: { depreciation: DepreciationBookResolve}},
      { path: 'tax/create', component: TaxFormComponent},
      { path: 'tax/schedule', component: TaxScheduleComponent },
      { path: 'tax/:depreciationId/edit', component: TaxFormComponent, resolve: { depreciation: DepreciationTaxResolve}}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DepreciationRoutingModule { }
