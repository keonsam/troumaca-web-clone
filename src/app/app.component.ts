import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import "rxjs/add/operator/filter";
import {AppDynamicStyle} from "./app.dynamic.style";

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

  constructor(private router:Router) {
    // this.isLoggedIn = true;
    // this.styleMap.set("/", new AppDynamicStyle(true, false, false));
    // this.styleMap.set("/home", new AppDynamicStyle(true, false, false));
    // this.styleMap.set("/login", new AppDynamicStyle(false, false, true));
    // this.styleMap.set("default", new AppDynamicStyle(false, true, false));

    // this.appDynamicStyle = this.styleMap.get("default");

    // this.styleMap.set("home", "isSithSidePanel");
    // this.styleMap.set("login", "with-pattern");
    // this.styleMap.set("default", "no-padding-content");



  }

  ngOnInit(): void {
    // if (!this.isLoggedIn) {
    //   this.router.navigate(['/login'])
    // }

    // var that = this;
    // this.router
    // .events
    // .filter(event => event instanceof NavigationStart)
    // .subscribe((event:NavigationStart) => {
    //   let url = event.url;
    //   let newVar:AppDynamicStyle = that.styleMap.get(url);
    //   if (newVar) {
    //     that.appDynamicStyle = newVar;
    //   } else {
    //     that.appDynamicStyle = that.styleMap.get("default");
    //   }
    //   this.someClass = this.contains(url, this.withPatternRoutes);
    // });
  }

  private contains(value:string, itemList:string[]):boolean {
    return itemList.filter(item => {
      return value.endsWith(item);
    }).length > 0;
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
