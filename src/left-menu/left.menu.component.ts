import {Component, Input, OnInit} from '@angular/core';
import {LeftMenuService} from './left.menu.service';
import {LeftMenuModel} from './left.menu.model';
import {LeftMenuItemModel} from './left.menu.item.model';

@Component({
  selector: 'left-menu',
  templateUrl: './left.menu.component.html',
  styleUrls: ['./left.menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  private _title: string;
  private _leftMenuModels: LeftMenuModel[];
  private _leftMenuModel: LeftMenuModel;
  private _name: string;

  constructor(private leftMenuService: LeftMenuService) {
    this._title = 'Troumaca';
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

  get leftMenuModels(): LeftMenuModel[] {
    return this._leftMenuModels;
  }

  set leftMenuModels(value: LeftMenuModel[]) {
    this._leftMenuModels = value;
  }

  get leftMenuModel(): LeftMenuModel {
    return this._leftMenuModel;
  }

  set leftMenuModel(value: LeftMenuModel) {
    this._leftMenuModel = value;
  }

  ngOnInit(): void {
    const that = this;
    this.leftMenuService.getLeftMenuByName(this.name).subscribe((leftMenu) => {
      that.leftMenuModel = leftMenu;
    });
  }

}
