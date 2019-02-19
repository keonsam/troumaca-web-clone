import {Component, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import { authRoutes } from './auth.routes';
import {SessionService} from '../session/session.service';
import {HOME} from './routes';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  isAuthPath = true;
  homeLink = `/${HOME}`;

  constructor(private router: Router,
              private renderer: Renderer2,
              private sessionService: SessionService
              ) {

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const url = this.calURL(event.url);
        if (authRoutes.indexOf(url) > -1 || url.indexOf('forgot-password') > -1) {
          this.isAuthPath = true;
        } else {
          this.isAuthPath = false;
        }
      }
    });

    this.sessionService.logoutEvent
      .subscribe( value => {
        if (value) {
          this.router.navigate(['/home']);
          // this.isAuthPath = true;
        }
      });
  }

  ngOnInit(): void {
  }

  private calURL(url) {
    const matchRegex = /\/[a-z-]*\/[a-z-]*\//gi;
    if (url.indexOf('confirmations') !== -1 ) {
      return url.match(matchRegex)[0].slice(0, -1);
    }
    return url;
  }
}
