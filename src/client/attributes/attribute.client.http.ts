import {AttributeClient} from "./attribute.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AttributeState} from "./attribute.state";

export class AttributeClientHttp extends AttributeClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort:string) {
    super();
  }

  public getAttributes(): Observable<AttributeState[]> {
    throw new Error("Method not implemented.");
  }

  public addAttribute(attributeState: AttributeState): Observable<AttributeState> {
    let url = `${this.hostPort}/attributes`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post(url, attributeState.toJson(), {headers: headers})
    .map(data => {
      return data;
    });
  }

}
