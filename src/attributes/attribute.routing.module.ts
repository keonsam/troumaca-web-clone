import {Routes, RouterModule} from '@angular/router';
import {NgModule} from "@angular/core";
import {AttributeComponent} from "./attribute.component";
import {AttributeListComponent} from "./attribute-list/attribute.list.component";
import { AttributeFormComponent } from "./attribute-form/attribute.form.component";
import {AttributeResolve} from "./attribute.resolve";

export const routes: Routes = [
  { path: '', component: AttributeComponent, children: [
      { path: '', redirectTo: 'attributes/listing', pathMatch: 'full' },
      { path: 'listing', component: AttributeListComponent },
      { path: 'create', component: AttributeFormComponent },
      { path: ':attributeId/edit', component: AttributeFormComponent, resolve: { attribute: AttributeResolve} }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AttributeRoutingModule { }
