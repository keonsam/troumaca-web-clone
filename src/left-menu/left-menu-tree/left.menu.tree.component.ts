import {Component, Input, OnInit} from '@angular/core';
import {LeftMenuItemModel} from "../left.menu.item.model";

@Component({
  selector: 'left-menu-tree',
  templateUrl: './left.menu.tree.component.html',
  styleUrls: ['./left.menu.tree.component.css']
})
export class LeftMenuTreeComponent implements OnInit {

  private _title:string;
  private _leftMenuItemModels:LeftMenuItemModel[];
  private _name:string;

  constructor() {
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get name(): string {
    return this._name;
  }

  @Input()
  set name(value: string) {
    this._name = value;
  }

  get leftMenuItemModels(): LeftMenuItemModel[] {
    return this._leftMenuItemModels;
  }

  @Input()
  set leftMenuItemModels(value: LeftMenuItemModel[]) {
    this._leftMenuItemModels = value;
  }


  ngOnInit(): void {
  }

}