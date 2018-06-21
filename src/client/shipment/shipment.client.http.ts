import {ShipmentClient} from './shipment.client';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UUIDGenerator} from '../../uuid.generator';
import {ShipmentStates} from './shipment.states';

export class ShipmentClientHttp extends ShipmentClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
    super();
  }

  public getShipments(): Observable<ShipmentStates> {
    const url = `${this.hostPort}/shipments`;
    const headers: HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
      .get<ShipmentStates>(url, {headers: headers})
      .map(data => {
        return data;
      });
  }

}
