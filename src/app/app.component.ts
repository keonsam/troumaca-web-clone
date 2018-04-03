import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import "rxjs/add/operator/filter";
import {AppDynamicStyle} from "./app.dynamic.style";
import {EventService} from "../event/event.service";
import {SessionService} from "../session/session.service";
import {ClientEvent} from "../client/client.event";

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

  private logInSub: any;
  private initLogSub: any;


  constructor(private router:Router,
              private route:ActivatedRoute,
              private eventService:EventService,
              private sessionService: SessionService,
              private clientEvent: ClientEvent) {
    this.isLoggedIn = false;

    this.eventService.subscribeToLoginEvent( (data) => {
      this.logInSub = this.router.events.subscribe( (event:any) => {
        if (event instanceof NavigationEnd) {
          this.isLoggedIn = true;
          this.logInSub.unsubscribe();
        }
      });
    });

    this.clientEvent.subscribeToUnauthorizedEvent((data) => {
      this.isLoggedIn = false;
      this.router.navigate(['/home']);
    });

    this.clientEvent.subscribeToLogoutEvent((data) => {
      this.isLoggedIn = false;
      this.router.navigate(['/home']);
    });
  }

  ngOnInit(): void {
    this.initLogSub = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.sessionService.activeSessionExists()
          .subscribe(value => {
            let url = event.url;
            if (value && url !== "/create-profile") {
              this.isLoggedIn = true;
            }
            this.initLogSub.unsubscribe();
          });
      }
    });
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
