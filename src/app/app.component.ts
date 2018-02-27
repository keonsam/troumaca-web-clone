import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import "rxjs/add/operator/filter";
import {AppDynamicStyle} from "./app.dynamic.style";
import {EventService} from "../event/event.service";
import {SessionService} from "../session/session.service";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    "[class.auth-wrapper]":"someClass"
  }
})
export class AppComponent implements OnInit{

  private _title:string = 'app';
  private _isLoggedIn:boolean;
  someClass:boolean = false;

  private _appDynamicStyle:AppDynamicStyle;

  private _styleMap:Map<string, AppDynamicStyle> = new Map<string, AppDynamicStyle>();

  // Todo: this need improving. It is not maintainable.
  private withPatternRoutes:string[] = [
    "sign-in",
    "login",
    "register"
  ];

  constructor(private router:Router,
              private route:ActivatedRoute,
              private eventService:EventService,
              private sessionService:SessionService) {

    this.isLoggedIn = false;
    this.eventService.subscribeToLoginEvent( (data) => {
      // this.sessionService.
      // this.isLoggedIn = true;
    });

  }

  ngOnInit(): void {

  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  get applyWithPattern(): boolean {
    return this.someClass
  }

  get styleMap(): Map<string, AppDynamicStyle> {
    return this._styleMap;
  }

  get appDynamicStyle(): AppDynamicStyle {
    return this._appDynamicStyle;
  }

  set appDynamicStyle(value: AppDynamicStyle) {
    this._appDynamicStyle = value;
  }
}
