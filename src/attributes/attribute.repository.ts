import {AttributeModel} from "./attribute.model";
import {Observable} from "rxjs/Observable";

export abstract class AttributeRepository {
  abstract getAttributes():Observable<AttributeModel[]>;
}