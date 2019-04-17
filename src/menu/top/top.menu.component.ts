import {Component, OnInit} from '@angular/core';
import {MenuService} from '../menu.service';
import {SessionService} from '../../session/session.service';
import {NavigationEnd, Router} from '@angular/router';
import {TopMenuNav} from '../top.menu.nav';
import {BILLING_DETAIL, LOBBY, ORGANIZATION, USER} from '../../app/routes';
import {UserMenu} from '../user.menu';

@Component({
  selector: 'top-menu',
  templateUrl: './top.menu.component.html',
  styleUrls: ['./top.menu.component.css']
})
export class TopMenuComponent implements OnInit {

  overClass2 = false;
  displaySearchBox: boolean;
  apps: any[];
  sub: any;
  menuList: TopMenuNav[];
  lobbyLink = `/${LOBBY}`;
  comProLink = `/${ORGANIZATION}/profile`;
  billingLink = `/${BILLING_DETAIL}`;
  userProfile = `/${USER}/profile`;
  userMenu: UserMenu;

  constructor(private menuService: MenuService,
              private sessionService: SessionService,
              private router: Router) {
    this.apps = [];
    this.displaySearchBox = true;
    this.menuList = [];
    this.userMenu = new UserMenu();

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
    // this.getUserMenu();
    // this.menuService.getApps()
    //   .subscribe( apps => {
    //     this.apps = apps;
    //   });
  }

  private getUserMenu() {
    this.menuService.getUserMenu()
      .subscribe( userMenu => {
        this.userMenu = userMenu;
      })
  }

  logOutEvent() {
    this.sessionService.logout()
      .subscribe( value => {
        if (value) {
          this.sessionService.logoutEvent.next(true);
        }
      });
  }

  onDeactivate() {
    console.log('function not implemented');
  }

}
