import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MenuService} from './menu.service';
import {MenuModel} from './menu.model';
import {MenuItemModel} from './menu.item.model';
import {EventService} from '../event/event.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

  private _title: string;
  private _menuModel: MenuModel;
  private _isLoggedIn: boolean;

  constructor(private eventService: EventService, private menuService: MenuService, private cd: ChangeDetectorRef) {
    this.title = 'Troumaca';
    this.isLoggedIn = false;
    this.menuModel = new MenuModel();
    this.menuModel.menuItemModels = [];
    console.log('Ok.');
  }

  handleMenuRefreshEvent() {
    const that = this;
    this.eventService.subscribeToLoginEvent((event) => {
      that.isLoggedIn = true;
      that.getMenu(this.isLoggedIn);
    });
  }

  get title(): string {
    return this._title;
  }

  set title(title: string) {
    this._title = title;
  }

  get menuModel(): MenuModel {
    return this._menuModel;
  }

  @Input()
  set menuModel(value: MenuModel) {
    this._menuModel = value;
  }

  @Input()
  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  ngOnInit(): void {
    this.getMenu(this.isLoggedIn);

    this.handleMenuRefreshEvent();
  }

  getMenu(isLoggedIn: boolean) {
    const that = this;
    this.menuService.getMenu(isLoggedIn).subscribe(function (menu) {
      that.menuModel.menuItemModels = [];
      menu.menuItemModels.forEach(value => {
        that.menuModel.menuItemModels.push(value);
      });

      that.cd.markForCheck();
    });
  }

  onSelected(menuItemModel: MenuItemModel) {
    this._menuModel.menuItemModels.forEach(mi => {
      if (mi.active) {
        mi.active = false
      }
    });
    menuItemModel.active = true;
  }

}
