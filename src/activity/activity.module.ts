import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivityComponent} from './activity.component';
import {activityRouting} from './activity.routing';
import {ActivityService} from './activity.service';
import {ActivityRepository} from './activity.repository';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    activityRouting,
  ],
  declarations: [
    ActivityComponent
  ],
  providers: [{
    provide: ActivityService,
    useFactory(activityRepository: ActivityRepository) {
      let activityService: ActivityService;
      if (!activityService) {
        activityService = new ActivityService(activityRepository);
      }
      return activityService;
    },
    deps: [ActivityRepository]
  }],
  exports: [
    ActivityComponent
  ]
})
export class ActivityModule {}
