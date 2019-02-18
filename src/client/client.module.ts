import {NgModule} from '@angular/core';
import {reportClientProvider} from './report/report.client.provider';
import {accountClientProvider} from './account/account.client.provider';
import {sessionClientProvider} from './session/session.client.provider';
import {activityClientProvider} from './activity/activity.client.provider';
import {workOrderClientProvider} from './work-order/work.order.client.provider';
import {requestClientProvider} from './request/request.client.provider';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {unitOfMeasureClientProvider} from './unit-of-measure/unit.of.measure.client.provider';
import {contractClientProvider} from './contract/contract.client.provider';
import {shipmentClientProvider} from './shipment/shipment.client.provider';
import {sessionInterceptorProvider} from './session.interceptor.provider';
import {clientEventProvider} from './client.event.provider';

@NgModule({
  imports:      [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [],
  exports:      [],
  providers: [
    accountClientProvider,
    reportClientProvider,
    sessionClientProvider,
    activityClientProvider,
    workOrderClientProvider,
    requestClientProvider,
    contractClientProvider,
    shipmentClientProvider,
    clientEventProvider,
    sessionInterceptorProvider,
  ]
})
export class ClientModule { }

// {
//   provide: HTTP_INTERCEPTORS,
//     useClass: SessionInterceptor,
//   multi: true
// }

// sessionInterceptorProvider
