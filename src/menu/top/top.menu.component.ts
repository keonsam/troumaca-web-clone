import {Component, OnInit} from '@angular/core';
import {App} from "../../lobby/app";
import {MenuService} from "../menu.service";


@Component({
  selector: 'top-menu',
  templateUrl: './top.menu.component.html',
  styleUrls: ['./top.menu.component.css']
})
export class TopMenuComponent implements OnInit {

  overClass = false;
  overClass2 = false;
  displaySearchBox: boolean;
  apps: App[];

  constructor(private menuService: MenuService) {
    this.apps = [];
    this.displaySearchBox = true;
  }

  ngOnInit(): void {
    this.menuService.getApps()
      .subscribe( apps => {
        this.apps = apps;
      });
  }

}
