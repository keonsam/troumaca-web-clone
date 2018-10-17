import {Component, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import { authRoutes } from "./auth.routes";

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  isAuthPath = false;
  showMenu = false;

  constructor(private router: Router,
              private renderer: Renderer2,
              ) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {

      if (event instanceof NavigationStart) {
        const url = this.calURL(event.url);
        if (authRoutes.indexOf(url) > -1) {
          this.isAuthPath = true;
          this.renderer.addClass(document.body, 'center-container');
        } else {
          this.isAuthPath = false;
          this.renderer.removeClass(document.body, 'center-container');
        }
      }

      if (event instanceof NavigationEnd) {
        const url = this.calURL(event.url);
        if (authRoutes.indexOf(url) > -1 || url === '/profile-organizations') {
          this.showMenu = false;
        } else {
          this.showMenu = true;
        }
      }
    });
  }

  private calURL(url) {
    const matchRegex = /\/[a-z-]*\/[a-z-]*\//gi;
    if (url.indexOf('confirmations') !== -1) {
      return url.match(matchRegex)[0].slice(0, -1);
    }
    return url;
  }
}
