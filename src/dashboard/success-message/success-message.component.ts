import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardLayoutService} from '../dashboard.layout.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  templateUrl: 'success-message.component.html',
  styleUrls: ['success-message.component.css'],
  selector: 'app-success-message'
})
export class SuccessMessageComponent implements OnDestroy {
  type: string;
  name: string;
  show: boolean;
  private _destroyed$ = new Subject();

  constructor(private dashboardLayoutService: DashboardLayoutService) {
    this.dashboardLayoutService.success
      .pipe(
        takeUntil(this._destroyed$)
      )
      .subscribe( value => {
        if (value && value.show) {
          this.type = value.type;
          this.name = value.name;
          this.show = true;
        }
      });
  }

  ngOnDestroy (): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  toggleShow() {
    this.dashboardLayoutService.successNext.next(true);
    this.show =  false;
  }
}
