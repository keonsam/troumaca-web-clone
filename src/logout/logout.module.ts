import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LogoutComponent} from "./logout.component";
import {logoutRouting} from "./logout.routing";
import {LogoutService} from "./logout.service";
import {LogoutRepository} from "./logout.repository";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    logoutRouting,
  ],
  declarations: [
    LogoutComponent
  ],
  providers: [{
    provide: LogoutService,
    useFactory(logoutRepository:LogoutRepository) {
      let logoutService: LogoutService;
      if (!logoutService) {
        logoutService = new LogoutService(logoutRepository);
      }
      return logoutService;
    },
    deps: [LogoutRepository]
  }],
  exports: [
    LogoutComponent
  ]
})
export class LogoutModule {}