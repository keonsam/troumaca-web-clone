import {Component, OnInit, Renderer2} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  private isAuthRoutes: string[] = [
    '/',
    '/home',
    '/authentication/login',
    '/authentication/forgot-password',
    '/authentication/confirmations',
    '/authentication/register'
  ];

  constructor(private router: Router,
              private renderer: Renderer2,
              ) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        const url = this.calURL(event.url);
        if (this.isAuthRoutes.indexOf(url) !== -1) {
          this.renderer.addClass(document.body, 'center-container');
        } else {
          this.renderer.removeClass(document.body, 'center-container');
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
