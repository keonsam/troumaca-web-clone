import {Observable} from 'rxjs';
import {SaleOrderState} from './sale.order.state';

export abstract class ContractClient {
  public abstract getSaleOrders(): Observable<SaleOrderState[]>;
}
