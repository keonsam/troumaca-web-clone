// import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
// import { PageEvent } from "@angular/material";
// import {Page} from "../page/page";
//
// @Component({
//   selector: 'paging',
//   templateUrl: './paging.component.html',
//   styleUrls: ['./paging.component.css']
// })
// export class PagingComponent implements OnInit, OnChanges {
//
//   length = 0;
//   pageSize = 10;
//   pageSizeOptions: number[] = [5, 10, 25, 100];
//   @Output() requestPage = new EventEmitter<PageEvent>();
//   @Input() page: Page;
//
//   ngOnInit(): void {
//     this.length = this.page.totalItems;
//   }
//
//   ngOnChanges(): void {
//     this.length = this.page.totalItems;
//   }
//
//
//   onRequestPage(pageEvent: PageEvent) {
//     this.requestPage.emit(pageEvent);
//   }
//
//
// }
