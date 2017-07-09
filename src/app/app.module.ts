import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from "@angular/common";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// App Component
import { AppComponent } from './app.component';
import {routing, appRoutingProviders} from "./app.routing";
import {UUIDGenerator} from "../uuid.generator";
import {AppConfig} from "../app.config";

// Other Components
import { HomeModule } from '../home/home.module';
import {MenuModule} from "../menu/menu.module";
import {ClientModule} from "../client/client.module";
import {AdapterModule} from "../adapter/adapter.module";


// {provide: APP_BASE_HREF, useValue: '/'},

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    MenuModule,
    routing,
    HomeModule,
    ClientModule,
    AdapterModule
  ],
  providers: [
    appRoutingProviders,
    {provide: AppConfig, useClass: AppConfig},
    {provide: UUIDGenerator, useClass: UUIDGenerator}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
