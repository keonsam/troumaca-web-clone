import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {accountRouting} from './account.routing';
import {AccountComponent} from './account.component';
import {AccountService} from './account.service';
import {AccountRepository} from './account.repository';
import {RouterModule} from '@angular/router';
import {LeftMenuModule} from '../left-menu/left.menu.module';
import {OrganizationsModule} from '../organizations/organizations.module';
import {PartyModule} from '../parties/party.module';
import {SecurityModule} from '../security/security.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    accountRouting,
    LeftMenuModule,
    OrganizationsModule,
    PartyModule,
    SecurityModule
  ],
  declarations: [
    AccountComponent
  ],
  providers: [{
    provide: AccountService,
    useFactory(accountRepository: AccountRepository) {
      let accountService: AccountService;
      if (!accountService) {
        accountService = new AccountService(accountRepository);
      }
      return accountService;
    },
    deps: [AccountRepository]
  }],
  exports: [
    AccountComponent
  ]
})
export class AccountModule {}
