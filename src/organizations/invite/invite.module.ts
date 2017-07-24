import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InviteComponent} from "./invite.component";
// import {inviteRouting} from "./invite.routing";
import {InviteService} from "./invite.service";
import {InviteRepository} from "./invite.repository";
import {RouterModule} from "@angular/router";

// ,
// inviteRouting,

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    InviteComponent
  ],
  providers: [{
    provide: InviteService,
    useFactory(inviteRepository:InviteRepository) {
      let inviteService: InviteService;
      if (!inviteService) {
        inviteService = new InviteService(inviteRepository);
      }
      return inviteService;
    },
    deps: [InviteRepository]
  }],
  exports: [
    InviteComponent
  ]
})
export class InviteModule {}