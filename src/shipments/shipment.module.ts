import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MenuModule} from "../menu/menu.module";
import {PagingModule} from "../paging/paging.module";
import {ShipmentComponent} from "./shipment.component";
import {ShipmentService} from "./shipment.service";
import {ShipmentRepository} from "./shipment.repository";
import {ShipmentListComponent} from "./shipment-list/shipment.list.component";
import {ShipmentEditComponent} from "./shipment-edit/shipment.edit.component";
import {ShipmentCreationComponent} from "./shipment-creation/shipment.creation.component";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagingModule,
    MenuModule
  ],
  declarations: [
    ShipmentComponent,
    ShipmentListComponent,
    ShipmentEditComponent,
    ShipmentCreationComponent
  ],
  providers: [{
    provide: ShipmentService,
    useFactory(shipmentRepository:ShipmentRepository) {
      let shipmentService: ShipmentService;
      if (!shipmentService) {
        shipmentService = new ShipmentService(shipmentRepository);
      }
      return shipmentService;
    },
    deps: [ShipmentRepository]
  }],
  exports: [
    ShipmentComponent,
    ShipmentListComponent,
    ShipmentEditComponent,
    ShipmentCreationComponent
  ]
})
export class ShipmentModule {
}