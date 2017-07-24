import {MenuClient} from "./menu.client";
import {Observable} from "rxjs/Observable";
import {MenuState} from "./menu.state";
import {UUIDGenerator} from "../../uuid.generator";
import {Subject} from "rxjs/Subject";
import {OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";

export class MenuClientHttp extends MenuClient implements OnInit, OnDestroy {

  private isLoggedIn:boolean = false;
  private subscription:Subscription;

  constructor(private loginSubject:Subject<boolean>, private uuidGenerator: UUIDGenerator) {
    super();
  }

  ngOnInit(): void {
    if (this.loginSubject) {
      this.subscription = this.loginSubject.subscribe(loggedIn => this.isLoggedIn = loggedIn);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getTopMenuState(): Observable<MenuState> {
    throw new Error("Method not implemented.");
  }

  getLeftMenuState(): Observable<MenuState[]> {
    throw new Error("Method not implemented.");
  }

}