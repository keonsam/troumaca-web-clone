// import {Component, OnInit} from '@angular/core';
// import {ShipmentService} from './shipment.service';
// import {NavigationEnd, Router} from '@angular/router';
// import { filter } from "rxjs/operators";
//
// @Component({
//   selector: 'shipment',
//   templateUrl: './shipment.component.html',
//   styleUrls: ['./shipment.component.css']
// })
// export class ShipmentComponent implements OnInit {
//
//   private _dynamicMenuName: string;
//
//   constructor(private shipmentService: ShipmentService,
//               private router: Router) {
//
//     this.router.events
//       .pipe(filter((event: any) => event instanceof NavigationEnd))
//       .subscribe(() => {
//         let root = this.router.routerState.snapshot.root;
//         let counter = 0;
//         while (root) {
//           counter++;
//           if (root.children && root.children.length) {
//             root = root.children[0];
//           } else if (root.data && root.data['menuName']) {
//             this.dynamicMenuName = root.data['menuName'];
//             return;
//           } else {
//             return;
//           }
//         }
//       })
//
//   }
//
//   get dynamicMenuName(): string {
//     return this._dynamicMenuName;
//   }
//
//   set dynamicMenuName(value: string) {
//     this._dynamicMenuName = value;
//   }
//
//   ngOnInit(): void {
//   }
//
// }
