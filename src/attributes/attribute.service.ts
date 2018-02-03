import {Observable} from "rxjs/Observable";
import {AttributeRepository} from "./attribute.repository";
import {Attribute} from "./attribute";

export class AttributeService {

  constructor(private attributeRepository:AttributeRepository) {
  }

  public addAttribute(attribute: Attribute):Observable<Attribute> {
    return this.attributeRepository.addAttribute(attribute);
  }
}
