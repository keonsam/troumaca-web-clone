import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AttributeService } from './attribute.service';
import { Attribute } from './attribute';

@Injectable()
export class AttributeResolve implements Resolve<Attribute> {
  constructor(private attributeService: AttributeService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.attributeService.getAttributeById(route.paramMap.get('attributeId'));
  }
}
