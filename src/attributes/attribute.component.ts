import {Component, OnInit} from "@angular/core";
import {AttributeService} from "./attribute.service";
import {Attribute} from "./attribute";

@Component({
  selector: 'asset-types',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  private _attributeModels:Attribute[];

  constructor(private attributeService:AttributeService) {
  }

  ngOnInit(): void {
  }

  get attributeModels(): Attribute[] {
    return this._attributeModels;
  }

  set attributeModels(value: Attribute[]) {
    this._attributeModels = value;
  }
}