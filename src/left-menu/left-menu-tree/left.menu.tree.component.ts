import {Component, Input, OnInit} from '@angular/core';
import {LeftMenuItemModel} from '../left.menu.item.model';

@Component({
  selector: 'left-menu-tree',
  templateUrl: './left.menu.tree.component.html',
  styleUrls: ['./left.menu.tree.component.css']
})
export class LeftMenuTreeComponent implements OnInit {

  private _leftMenuItemModels: LeftMenuItemModel[];

  constructor() {
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
