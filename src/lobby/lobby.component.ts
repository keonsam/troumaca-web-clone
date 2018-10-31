import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router} from '@angular/router';
import { Subscription } from './subscription';
import { App } from './app';
import {LobbyService} from './lobby.service';
import {BillingDetailsService} from '../billing-details/billing.details.service';

@Component({
  selector: 'app-lobby-home',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})

export class LobbyComponent implements OnInit {

  apps: App[];
  app: App;
  @ViewChild('showModal') showModal: ElementRef;
  @ViewChild('closeButton') closeButton: ElementRef;
  doNotDisplayFailureMessage = true;
  doNotDisplayFailureMessage2 = true;
  validBilling = false;



  constructor(private lobbyService: LobbyService,
              private billingDetailsService: BillingDetailsService,
              private router: Router) {
    this.apps = [];
  }

  ngOnInit(): void {
    this.getApps();
  }

  private getApps() {
    this.lobbyService.getApps()
      .subscribe( apps => {
        if (apps && apps.length > 0) {
          this.apps = apps;
        }
      });
  }

  onApp(app: App) {
    this.doNotDisplayFailureMessage2 = true;
    this.app = app;
    if (app.subscribed) {
      this.router.navigate([app.route]);
    } else {
      this.billingDetailsService.isValidPaymentMethod()
        .subscribe( value => {
          if (value && value.valid) {
            this.validBilling = true;
          }else {
            this.doNotDisplayFailureMessage2 = false;
            this.validBilling = false;
          }
          this.showModal.nativeElement.click();
        });
    }
  }

  onSubscribe() {
    this.doNotDisplayFailureMessage = true;
    this.doNotDisplayFailureMessage2 = true;
    const subscription: Subscription = new Subscription(this.app.moduleId);
    this.lobbyService.addSubscription(subscription)
      .subscribe( sub => {
        if (sub && sub.subscriptionId) {
          this.closeButton.nativeElement.click();
          this.getApps();
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      });
  }

}

