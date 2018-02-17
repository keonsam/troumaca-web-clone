import {ShipmentClient} from "../../client/shipment/shipment.client";
import {ShipmentRepository} from "../../shipments/shipment.repository";
import {ShipmentRepositoryAdapter} from "./shipment.repository.adapter";

export function shipmentsRepositoryProviderFactory (shipmentClient:ShipmentClient):ShipmentRepository {
  let shipmentRepositoryAdapter: ShipmentRepositoryAdapter;
  if (!shipmentRepositoryAdapter) {
    shipmentRepositoryAdapter = new ShipmentRepositoryAdapter(shipmentClient);
  }
  return shipmentRepositoryAdapter;
}

export let shipmentRepositoryProvider = {
  provide: ShipmentRepository,
  useFactory: shipmentsRepositoryProviderFactory,
  deps: [ShipmentClient]
};