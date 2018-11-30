import {Component, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import { authRoutes } from "./auth.routes";
import {SessionService} from "../session/session.service";

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  isAuthPath = false;
  showMenu = false;
  activeSession: any;
  loginEvent: any;

  constructor(private router: Router,
              private renderer: Renderer2,
              private sessionService: SessionService
              ) {
    this.activeSession = this.sessionService.activeSessionExists()
      .subscribe(value => {
        if (value) {
          const routerEvent = this.router.events.subscribe( event => {
            if (event instanceof NavigationEnd) {
              if (event.url !== '/profile-organizations') {
                this.showMenu = true;
              }
              routerEvent.unsubscribe();
            }
          });
        }
        this.activeSession.unsubscribe();
      });

    this.loginEvent = this.sessionService.loginEvent
      .subscribe( value => {
        if (value) {
          const routerEvent = this.router.events.subscribe( event => {
            if (event instanceof NavigationEnd) {
              if (event.url !== '/profile-organizations') {
                this.showMenu = true;
              }
              routerEvent.unsubscribe();
            }
          });
          this.loginEvent.unsubscribe();
        }
      });

    this.sessionService.logoutEvent
      .subscribe( value => {
        if (value) {
          this.showMenu = false;
          this.router.navigate(['/home']);
        }
      });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        const url = this.calURL(event.url);
        if (authRoutes.indexOf(url) > -1 || url.indexOf('forgot-password') > -1) {
          this.isAuthPath = true;
          this.renderer.addClass(document.body, 'center-container');
        } else {
          this.isAuthPath = false;
          this.renderer.removeClass(document.body, 'center-container');
        }
      }
    });
  }

  private calURL(url) {
    const matchRegex = /\/[a-z-]*\/[a-z-]*\//gi;
    if (url.indexOf('confirmations') !== -1 ) {
      return url.match(matchRegex)[0].slice(0, -1);
    }
    return url;
  }
}
