import {Component, OnInit} from "@angular/core";
import {AttributeService} from "./attribute.service";
import {AttributeModel} from "./attribute.model";

@Component({
  selector: 'asset-types',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  private _attributeModels:AttributeModel[];

  constructor(private attributeService:AttributeService) {
  }

  ngOnInit(): void {
  }

  get attributeModels(): AttributeModel[] {
    return this._attributeModels;
  }

  set attributeModels(value: AttributeModel[]) {
    this._attributeModels = value;
  }
}