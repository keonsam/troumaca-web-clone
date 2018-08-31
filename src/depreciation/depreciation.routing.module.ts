import {Routes, RouterModule} from '@angular/router';
import {NgModule} from "@angular/core";
import {DepreciationComponent} from "./depreciation.component";
import {BookScheduleComponent} from "./book/book-schedule/book.schedule.component";
import {BookCreationComponent} from "./book/book-creation/book.creation.component";
import {BookEditComponent} from "./book/book-edit/book.edit.component";
import {TaxCreationComponent} from "./tax/tax-creation/tax.creation.component";
import {TaxScheduleComponent} from "./tax/tax-schedule/tax.schedule.component";
import {TaxEditComponent} from "./tax/tax-edit/tax.edit.component";

export const routes: Routes = [
  { path: '', component: DepreciationComponent, children: [
      { path: '', redirectTo: 'depreciation/book/schedule', pathMatch: 'full' },
      { path: 'book/schedule', component: BookScheduleComponent },
      { path: 'book/create', component: BookCreationComponent},
      { path: 'book/:depreciationId/edit', component: BookEditComponent},
      { path: 'tax/create', component: TaxCreationComponent},
      { path: 'tax/schedule', component: TaxScheduleComponent },
      { path: 'tax/:depreciationId/edit', component: TaxEditComponent}

    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DepreciationRoutingModule { }
