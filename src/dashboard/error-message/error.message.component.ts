import {Component, OnDestroy} from '@angular/core';
import {DashboardLayoutService} from '../dashboard.layout.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  templateUrl: 'error.message.component.html',
  styleUrls: ['error.message.component.css'],
  selector: 'app-error-message'
})
export class ErrorMessageComponent implements OnDestroy {
  show: boolean;
  private _destroyed$ = new Subject();

  constructor(private dashboardLayoutService: DashboardLayoutService) {
    this.dashboardLayoutService.error
      .pipe(
        takeUntil(this._destroyed$)
      )
      .subscribe( value => {
        if (value) {
          this.show = true;
        }
      });
  }

  ngOnDestroy (): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  toggleShow() {
    this.show =  false;
  }
}
