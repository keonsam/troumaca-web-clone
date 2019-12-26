import {Component, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.layout.component.html',
  styleUrls: ['./dashboard.layout.component.css']
})
export class DashboardLayoutComponent implements  OnDestroy {
  url: string;
  private _destroyed$ = new Subject();

  constructor(private router: Router) {
    this.router.events
      .pipe(
        takeUntil(this._destroyed$)
      ).subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.url = event.url.slice(event.url.lastIndexOf('/') + 1);
      }
    });
  }

  ngOnDestroy (): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
