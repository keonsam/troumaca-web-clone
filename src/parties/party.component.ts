import {ChangeDetectorRef, Component, Input, OnInit, Output} from '@angular/core';
import {Person} from './person';
import {PartyService} from './party.service';
import {PartyEventService} from './party.event.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

  private _persons: Person[];
  private _dynamicMenuName: string;

  constructor(private partyService: PartyService,
              private partyEventService: PartyEventService,
              private router: Router) {
    this.router.events
      .filter((event: any) => event instanceof NavigationEnd)
      .subscribe(() => {
        let root = this.router.routerState.snapshot.root;
        let counter = 0;
        while (root) {
          counter++;
          if (root.children && root.children.length) {
            root = root.children[0];
          } else if (root.data && root.data['menuName']) {
            this.dynamicMenuName = root.data['menuName'];
            return;
          } else {
            return;
          }
        }
      });
  }

  ngOnInit(): void {
  }

  get dynamicMenuName(): string {
    return this._dynamicMenuName;
  }

  set dynamicMenuName(value: string) {
    this._dynamicMenuName = value;
  }

  get persons(): Person[] {
    return this._persons;
  }

  set persons(value: Person[]) {
    this._persons = value;
  }

}
