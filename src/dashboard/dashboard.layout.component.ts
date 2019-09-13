import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.layout.component.html',
  styleUrls: ['./dashboard.layout.component.css']
})
export class DashboardLayoutComponent {
  url: string;
  constructor(private router: Router) {
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.url = event.url.slice(event.url.lastIndexOf('/') + 1);
      }
    });
  }
}
