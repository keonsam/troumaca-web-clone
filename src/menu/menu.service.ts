import {MenuRepository} from './menu.repository';
import {Observable} from 'rxjs';
import {MenuModel} from './menu.model';
import {Injectable} from '@angular/core';

export class MenuService {

  constructor(private menuRepository: MenuRepository) {
  }

  public getMenuByName(menuName: string): Observable<MenuModel> {
    return this.menuRepository.getMenuModelByName(menuName);
  }

  public getMenu(isLoggedIn: boolean): Observable<MenuModel> {
    return this.menuRepository.getMenuModel(isLoggedIn);
  }

}
