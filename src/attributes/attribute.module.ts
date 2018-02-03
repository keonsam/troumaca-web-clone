import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AttributeComponent} from "./attribute.component";
import {AttributeService} from "./attribute.service";
import {AttributeRepository} from "./attribute.repository";
import {RouterModule} from "@angular/router";
import {MenuModule} from "../menu/menu.module";
import {AttributeCreationComponent} from "./attribute-creation/attribute.creation.component";
import {AttributeEditComponent} from "./attribute-edit/attribute.edit.component";
import {AttributeListComponent} from "./attribute-list/attribute.list.component";
import {AttributeTopMenuComponent} from "./attribute-top-menu/attribute.top.menu.component";
import {SearchModule} from "../search/search.module";
import {PagingModule} from "../paging/paging.module";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    SearchModule,
    PagingModule
  ],
  declarations: [
    AttributeComponent,
    AttributeCreationComponent,
    AttributeEditComponent,
    AttributeListComponent,
    AttributeTopMenuComponent
  ],
  providers: [{
    provide: AttributeService,
    useFactory(attributeRepository:AttributeRepository) {
      let attributeService: AttributeService;
      if (!attributeService) {
        attributeService = new AttributeService(attributeRepository);
      }
      return attributeService;
    },
    deps: [AttributeRepository]
  }],
  exports: [
    AttributeComponent,
    AttributeCreationComponent,
    AttributeEditComponent,
    AttributeListComponent,
    AttributeTopMenuComponent
  ]
})
export class AttributeModule {}
