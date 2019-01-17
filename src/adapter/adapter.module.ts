import {NgModule} from '@angular/core';
import {sessionRepositoryProvider} from './session/session.repository.adapter.provider';
import {shipmentRepositoryProvider} from './shipment/shipment.repository.adapter.provider';
import {authGuardServiceProvider} from './auth-guard/auth.guard.repository.adapter.provider';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    authGuardServiceProvider,
    sessionRepositoryProvider,
    shipmentRepositoryProvider,
  ]
})
export class AdapterModule { }
