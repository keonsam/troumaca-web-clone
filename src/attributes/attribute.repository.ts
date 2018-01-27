import {Attribute} from "./attribute";
import {Observable} from "rxjs/Observable";

export abstract class AttributeRepository {
  abstract getAttributes():Observable<Attribute[]>;
}