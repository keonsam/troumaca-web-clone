import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WorkOrderComponent} from "./work.order.component";
import {workOrderRouting} from "./work.order.routing";
import {WorkOrderService} from "./work.order.service";
import {WorkOrderRepository} from "./work.order.repository";
import {RouterModule} from "@angular/router";
import {LeftMenuModule} from "../left-menu/left.menu.module";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    workOrderRouting,
    LeftMenuModule
  ],
  declarations: [
    WorkOrderComponent
  ],
  providers: [{
    provide: WorkOrderService,
    useFactory(workOrderRepository:WorkOrderRepository) {
      let workOrderService: WorkOrderService;
      if (!workOrderService) {
        workOrderService = new WorkOrderService(workOrderRepository);
      }
      return workOrderService;
    },
    deps: [WorkOrderRepository]
  }],
  exports: [
    WorkOrderComponent
  ]
})
export class WorkOrderModule {}