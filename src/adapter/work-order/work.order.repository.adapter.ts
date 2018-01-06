import "rxjs/add/operator/map";
import {WorkOrderClient} from "../../client/work-orders/work.order.client";
import {WorkOrderRepository} from "../../work-order/work.order.repository";

export class WorkOrderRepositoryAdapter extends WorkOrderRepository {
  constructor(private workOrderClient: WorkOrderClient) {
    super();
  }
}