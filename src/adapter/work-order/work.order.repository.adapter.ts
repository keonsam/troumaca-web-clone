
import {WorkOrderClient} from '../../client/work-order/work.order.client';
import {WorkOrderRepository} from '../../work-order/work.order.repository';

export class WorkOrderRepositoryAdapter extends WorkOrderRepository {
  constructor(private workOrderClient: WorkOrderClient) {
    super();
  }
}
