import {Component, Input, OnInit} from "@angular/core";
import {MenuModel} from "../menu.model";
import {MenuService} from "../menu.service";
import {EventService} from "../../event/event.service";
import {MenuItemModel} from "../menu.item.model";

@Component({
  selector: 'top-menu',
  templateUrl: './top.menu.component.html',
  styleUrls: ['./top.menu.component.css']
})
export class TopMenuComponent implements OnInit {

  private _title:string;
  private _menuModel:MenuModel;
  private _isLoggedIn:boolean;
  private _menuName:string;
  private _displaySearchBox:boolean;

  constructor(private eventService:EventService, private menuService:MenuService) {
    this.title = "Troumaca";
    this.isLoggedIn = false;
    this.menuModel = new MenuModel();
    this.menuModel.menuItemModels = [];
    this.menuName = "side-menu";
    this.displaySearchBox = false;
    // if (true) {
    //   console.log("Ok.");
    // }
  }

  ngOnInit(): void {
    this.getMenu(this.menuName);

    this.handleMenuRefreshEvent();
  }

  get title(): string {
    return this._title;
  }

  set title(title:string) {
    this._title = title;
  }

  get menuModel(): MenuModel {
    return this._menuModel;
  }

  @Input()
  set menuModel(value: MenuModel) {
    this._menuModel = value;
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  @Input()
  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  get menuName(): string {
    return this._menuName;
  }

  @Input()
  set menuName(value: string) {
    this._menuName = value;
    this.getMenu(value);
  }


  get displaySearchBox(): boolean {
    return this._displaySearchBox;
  }

  @Input()
  set displaySearchBox(value: boolean) {
    this._displaySearchBox = value;
  }

  handleMenuRefreshEvent() {
    let that = this;
    this.eventService.subscribeToLoginEvent((data) => {
      that.isLoggedIn = true;
      that.getMenu(that.menuName);
    });
  }

  getMenu(menuName:string) {
    console.log("getMenu(" + menuName + ")");
    let that = this;
    this.menuService.getMenuByName(menuName).subscribe(function (menu) {
      that.menuModel.menuItemModels = [];
      if (menu.menuItemModels) {
        menu.menuItemModels.forEach(value => {
          that.menuModel.menuItemModels.push(value);
        });
      }
    });
  }

  onSelected(menuItemModel:MenuItemModel) {
    this._menuModel.menuItemModels.forEach(mi => {
      if (mi.active) {
        mi.active = false
      }
    });
    menuItemModel.active = true;
  }

}
