import {NgModule} from '@angular/core';
import {leftMenuRepositoryProvider, menuRepositoryProvider} from "./menu/menu.repository.adapter.provider";
import {loginRepositoryProvider} from "./login/login.repository.adapter.provider";
import {accountRepositoryProvider} from "./account/account.repository.adapter.provider";
import {reportRepositoryProvider} from "./report/report.repository.adapter.provider";
import {signUpRepositoryProvider} from "./sign-up/sign.up.repository.adapter.provider";

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    menuRepositoryProvider,
    loginRepositoryProvider,
    accountRepositoryProvider,
    reportRepositoryProvider,
    signUpRepositoryProvider,
    leftMenuRepositoryProvider
  ]
})
export class AdapterModule { }