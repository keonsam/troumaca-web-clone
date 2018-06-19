import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {ContractService} from './contract.service';

@Component({
  selector: 'contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  private _dynamicMenuName: string;

  constructor(private contractService: ContractService,
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
      })
  }

  ngOnInit(): void {
  }

  get dynamicMenuName(): string {
    return this._dynamicMenuName;
  }

  set dynamicMenuName(value: string) {
    this._dynamicMenuName = value;
  }

}
