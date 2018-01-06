import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AttributeComponent} from "./attribute.component";
import {AttributeService} from "./attribute.service";
import {AttributeRepository} from "./attribute.repository";
import {RouterModule} from "@angular/router";
import {MenuModule} from "../menu/menu.module";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule
  ],
  declarations: [
    AttributeComponent
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
    AttributeComponent
  ]
})
export class AttributeModule {}