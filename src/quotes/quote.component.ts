import {Component, OnInit} from "@angular/core";
import {QuoteService} from "./quote.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'quote',
  templateUrl:'./quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  private _dynamicMenuName:string;

  constructor(private quoteService:QuoteService,
              private router:Router) {

    this.router.events
      .filter((event: any) => event instanceof NavigationEnd)
      .subscribe(() => {
        var root = this.router.routerState.snapshot.root;
        var counter = 0;
        while (root) {
          counter++;
          if (root.children && root.children.length) {
            root = root.children[0];
          } else if (root.data && root.data["menuName"]) {
            this.dynamicMenuName = root.data["menuName"];
            return;
          } else {
            return;
          }
        }
      })

  }

  get dynamicMenuName(): string {
    return this._dynamicMenuName;
  }

  set dynamicMenuName(value: string) {
    this._dynamicMenuName = value;
  }

  ngOnInit(): void {
  }

}