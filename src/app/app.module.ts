import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {appRoutingProviders} from './app.routing';
import {UUIDGenerator} from '../uuid.generator';
import {AppConfig} from '../app.config';

import {AdapterModule} from '../adapter/adapter.module';
import {PageNotFoundModule} from './page-not-found/page.not.found.module';

import {sessionInterceptorProvider} from '../client/session.interceptor.provider';
import {AppRoutingModule} from './app.routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SessionModule} from '../session/session.module';
import { ClientModule } from '../client/client.module';
import { MenuModule } from '../menu/menu.module';
import { MaterialModule } from './material.module';
import 'hammerjs';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import { GraphQLModule } from './graphql.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faUsers} from '@fortawesome/free-solid-svg-icons/faUsers';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faMobileAlt} from '@fortawesome/free-solid-svg-icons/faMobileAlt';
import { faBox } from '@fortawesome/free-solid-svg-icons/faBox';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import {
  faChevronDown,
  faChevronRight, faChevronUp,
  faFilter,
  faImage, faMapMarkerAlt,
  faSearch,
  faSortAmountDown,
  faTag,
  faThLarge
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdapterModule,
    PageNotFoundModule,
    SessionModule,
    ClientModule,
    MenuModule,
    MaterialModule,
    FlexLayoutModule,
    GraphQLModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    appRoutingProviders,
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: AppConfig, useClass: AppConfig},
    {provide: UUIDGenerator, useClass: UUIDGenerator},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    sessionInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faUser, faGoogle, faUsers, faCheck, faArrowLeft, faEnvelope, faMobileAlt, faBox, faList, faEllipsisH, faSearch, faCheck,
      faFilter, faSortAmountDown, faImage, faThLarge, faChevronRight, faTag, faChevronDown, faChevronUp, faMapMarkerAlt
    );
  }
}
