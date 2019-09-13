// import {AppConfig} from '../../app.config';
// import {HttpClient} from '@angular/common/http';
// import {UUIDGenerator} from '../../uuid.generator';
// import {ShipmentClient} from './shipment.client';
// import {ShipmentClientHttp} from './shipment.client.http';
//
// export function shipmentClientFactory (appConfig: AppConfig, httpClient: HttpClient, uuidGenerator: UUIDGenerator): ShipmentClient {
//   return new ShipmentClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
// }
//
// export let shipmentClientProvider = {
//   provide: ShipmentClient,
//   useFactory: shipmentClientFactory,
//   deps: [AppConfig, HttpClient, UUIDGenerator]
// };
