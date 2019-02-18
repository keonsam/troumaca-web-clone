import {Component, OnInit} from '@angular/core';
import {MenuService} from '../menu.service';
import {SessionService} from '../../session/session.service';
import {NavigationEnd, Router} from '@angular/router';
import {TopMenuNav} from '../top.menu.nav';
import {LOBBY} from '../../app/routes';

@Component({
  selector: 'top-menu',
  templateUrl: './top.menu.component.html',
  styleUrls: ['./top.menu.component.css']
})
export class TopMenuComponent implements OnInit {

  overClass = false;
  // overClass1 = false;
  overClass2 = false;
  displaySearchBox: boolean;
  apps: any[];
  sub: any;
  menuList: TopMenuNav[];
  lobbyLink = `/${LOBBY}`;

  constructor(private menuService: MenuService,
              private sessionService: SessionService,
              private router: Router) {
    this.apps = [];
    this.displaySearchBox = true;
    this.menuList = [];

    this.router.events.subscribe( (event: any) => {
      if (event instanceof NavigationEnd) {
        this.menuService.getTopMenu(event.url)
          .subscribe( topMenuNav => {
            this.menuList = topMenuNav;
          });
      }
    });
  }

  ngOnInit(): void {
    this.menuService.getApps()
      .subscribe( apps => {
        this.apps = apps;
      });
  }

  logOutEvent() {
    this.sessionService.logout()
      .subscribe( value => {
        if (value) {
          this.sessionService.logoutEvent.next(true);
        }
      });
  }

}
