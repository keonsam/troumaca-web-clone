import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router} from '@angular/router';
import { Subscription } from './subscription';
import { Module } from './module';
import {LobbyService} from './lobby.service';
import {BillingDetailsService} from "../billing-details/billing.details.service";
import {MatStepper} from "@angular/material";

@Component({
  selector: 'app-lobby-home',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})

export class LobbyComponent implements OnInit {

  modules: Module[];
  moduleClass: Module;
  @ViewChild('showModal') showModal: ElementRef;
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('closeButton') closeButton: ElementRef;
  private subscription: Subscription;
  doNotDisplayFailureMessage = true;
  billingModalType: string;
  billingExist = false;



  constructor(private lobbyService: LobbyService,
              private billingDetailsService: BillingDetailsService,
              private router: Router) {
    this.modules = [];
    this.billingModalType = 'new';
  }

  ngOnInit(): void {
    // this.billingDetailsService.getCreditCards()
    //   .subscribe( creditCards => {
    //     if (creditCards.length > 0) {
    //       this.billingExist = true;
    //     }
    //   });

    this.getModules();
  }

  private getModules() {
    this.lobbyService.getModules()
      .subscribe( modules => {
        if (modules) {
          this.modules = modules;
        }
      });
  }

  onModule(moduleId: string) {
    this.moduleClass = this.modules.find(x => x.moduleId === moduleId);
    if (this.moduleClass.subscribed) {
      this.router.navigate([this.moduleClass.information.route]);
    } else {
      this.showModal.nativeElement.click();
    }
  }

  nextStep(index: number) {
    if (this.stepper.selectedIndex !== index) {
      this.stepper.selectedIndex = index;
    }
  }

  onBillingChanges(changed: boolean) {
    if (changed) {
      this.nextStep(2);
      this.billingModalType = 'edit';
    }
  }

  onSubscribe() {
    this.doNotDisplayFailureMessage = true;
    console.log(this.moduleClass);
    this.subscription = new Subscription(this.moduleClass.moduleId, this.moduleClass.information.price);

    this.lobbyService.addSubscription(this.subscription)
      .subscribe( subscription => {
        console.log(subscription);
        if (subscription) {
          this.subscription = subscription;
          this.getModules();
          this.closeButton.nativeElement.click();
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      });
  }

}

