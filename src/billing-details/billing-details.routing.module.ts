import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BillingDetailsComponent} from "./billing-details.component";
import {AuthGuard} from "../auth-guard/auth.guard";

export const routes: Routes = [
  { path: '', component: BillingDetailsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BillingDetailsRoutingModule { }

