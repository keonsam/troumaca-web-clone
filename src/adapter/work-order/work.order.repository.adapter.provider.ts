import {WorkOrderRepositoryAdapter} from "./work.order.repository.adapter";
import {WorkOrderClient} from "../../client/work-order/work.order.client";
import {WorkOrderRepository} from "../../work-order/work.order.repository";

export function workOrderRepositoryProviderFactory (workOrderClient:WorkOrderClient):WorkOrderRepository {
  let workOrderRepositoryAdapter: WorkOrderRepositoryAdapter;
  if (!workOrderRepositoryAdapter) {
    workOrderRepositoryAdapter = new WorkOrderRepositoryAdapter(workOrderClient);
  }
  return workOrderRepositoryAdapter;
}

export let workOrderRepositoryProvider = {
  provide: WorkOrderRepository,
  useFactory: workOrderRepositoryProviderFactory,
  deps: [WorkOrderClient]
};