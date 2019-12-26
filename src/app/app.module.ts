import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {appRoutingProviders} from './app.routing';
import {UUIDGenerator} from '../uuid.generator';
import {AppRoutingModule} from './app.routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from './material.module';
import 'hammerjs';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import { GraphQLModule } from './graphql.module';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import {
  faEllipsisH, faList, faBox, faMobileAlt, faEnvelope,
  faCalendar, faArrowLeft, faCheck,
  faCheckDouble, faUsers, faUser,
  faCheckSquare,
  faChevronDown, faChevronLeft,
  faChevronRight, faChevronUp, faEdit, faEllipsisV,
  faFilter, faFont, faHashtag,
  faImage, faLink, faMapMarkerAlt,
  faSearch,
  faSortAmountDown,
  faTag, faTh,
  faThLarge, faTrashAlt, faExclamationTriangle, faBars, faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import { NgSelectModule } from '@ng-select/ng-select';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    VirtualScrollerModule,
    AppRoutingModule,
    FontAwesomeModule,
    MaterialModule,
    FlexLayoutModule,
    GraphQLModule,
    NgSelectModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    appRoutingProviders,
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: UUIDGenerator, useClass: UUIDGenerator},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(
      faUser, faGoogle, faUsers, faCheck, faArrowLeft, faEnvelope, faMobileAlt, faBox, faList, faEllipsisH, faSearch, faCheck,
      faFilter, faSortAmountDown, faImage, faThLarge, faChevronRight, faTag, faChevronDown, faChevronUp, faMapMarkerAlt,
      faFont, faHashtag, faCheckSquare, faCheckDouble, faCalendar, faLink, faChevronLeft, faTrashAlt, faEdit, faEllipsisV,
      faTh, faExclamationTriangle, faBars, faPencilAlt
    );
  }
}
