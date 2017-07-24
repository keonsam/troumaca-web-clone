import {Component, OnInit} from '@angular/core';
import {LeftMenuService} from "./left.menu.service";
import {LeftMenuModel} from "./left.menu.model";
import {LeftMenuItemModel} from "./left.menu.item.model";

@Component({
  selector: 'left-menu',
  templateUrl: './left.menu.component.html',
  styleUrls: ['./left.menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  private _title:string;
  private _leftMenuModels:LeftMenuModel[];

  constructor(private leftMenuService:LeftMenuService) {
    this._title = "Troumaca";
  }

  get title(): string {
    return this._title;
  }

  get leftMenuModels(): LeftMenuModel[] {
    return this._leftMenuModels;
  }

  set leftMenuModels(value: LeftMenuModel[]) {
    this._leftMenuModels = value;
  }

  getClasses(leftMenuItemMode:LeftMenuItemModel) {
    if (leftMenuItemMode.active) {
      return 'nav-item active';
    } else {
        return 'nav-item';
    }
  }

  ngOnInit(): void {
    let that = this;
    this.leftMenuService.getLeftMenu().subscribe(function (leftMenu) {
      that.leftMenuModels = leftMenu;
    });
  }

  onSelected(leftMenuModel:LeftMenuModel) {
    // this._leftMenuModel.leftMenuItemModelList.forEach(mi => {
    //   if (mi.active) {
    //     mi.active = false
    //   }
    //
    //   if (mi.id == leftMenuModel.id) {
    //     mi.active = true;
    //   }
    // });
  }

}