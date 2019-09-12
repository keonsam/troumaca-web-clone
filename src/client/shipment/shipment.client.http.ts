// import {ShipmentClient} from './shipment.client';
// import {Observable} from 'rxjs';
// import { map} from "rxjs/operators";
// import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {UUIDGenerator} from '../../uuid.generator';
// import {ShipmentStates} from './shipment.states';
//
// export class ShipmentClientHttp extends ShipmentClient {
//
//   constructor(private uuidGenerator: UUIDGenerator,
//               private httpClient: HttpClient,
//               private hostPort: string) {
//     super();
//   }
//
//   public getShipments(): Observable<ShipmentStates> {
//     const url = `${this.hostPort}/shipments`;
//     const headers: HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
//     return this.httpClient
//       .get<ShipmentStates>(url, {headers: headers})
//       .pipe(map(data => {
//         return data;
//       }));
//   }
//
// }
