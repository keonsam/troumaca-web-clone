import {NgModule} from '@angular/core';
import {menuClientProvider} from "./menu/menu.client.provider";
import {loginClientProvider} from "./login/login.client.provider";
import {reportClientProvider} from "./report/report.client.provider";
import {accountClientProvider} from "./account/account.client.provider";
import {logoutClientProvider} from "./logout/logout.client.provider";
import {signUpClientProvider} from "./sign-up/sign.up.client.provider";

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    accountClientProvider,
    loginClientProvider,
    menuClientProvider,
    logoutClientProvider,
    reportClientProvider,
    signUpClientProvider
  ]
})
export class ClientModule { }