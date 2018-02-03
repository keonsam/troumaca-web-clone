import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Page} from "../page/page";

@Component({
  selector: 'paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  private _page:Page;
  private _pages:number[];
  private _minPageNumber:number;
  private _maxPageNumber:number;
  private _hasPreviousPage:boolean;
  private _hasNextPage:boolean;
  private _requestPage:EventEmitter<number> = new EventEmitter<number>();
  private _pagingDisplayOn:boolean;

  constructor() {
    this.maxPageNumber = 0;
    this.maxPageNumber = 0;
    this.pagingDisplayOn = true;
  }

  ngOnInit(): void {
  }

  get page(): Page {
    return this._page;
  }

  @Input()
  set page(value: Page) {
    if (!value) {
      this.minPageNumber = 0;
      this.maxPageNumber = 0;
    } else if (!value.size && !value.totalItems) {
      this.minPageNumber = 0;
      this.maxPageNumber = 0;
    } else if (!value.size && value.totalItems) {
      this.minPageNumber = 1;
      this.maxPageNumber = 1;
    } else if (value.size && !value.totalItems) {
      this.pagingDisplayOn = false;
    } else if (value.size && value.totalItems) {
      if (value.size <= 0) {
        this.minPageNumber = 1;
        this.maxPageNumber = 1;
      } else {
        let pages = Math.ceil(value.totalItems/value.size);
        this.pages = this.createRange(pages);
        if (pages == 1) {
          this.minPageNumber = 1;
          this.maxPageNumber = 1;
        } else {
          this.minPageNumber = this.pages[0];
          this.maxPageNumber = this.pages[this.pages.length -1];
          this.hasPreviousPage = !(value.number == this.minPageNumber);
          this.hasNextPage = !(value.number == this.maxPageNumber);
        }
      }
    }

    this._page = value;
  }

  get pages(): number[] {
    return this._pages;
  }

  set pages(value: number[]) {
    this._pages = value;
  }

  get minPageNumber(): number {
    return this._minPageNumber;
  }

  set minPageNumber(value: number) {
    this._minPageNumber = value;
  }

  get maxPageNumber(): number {
    return this._maxPageNumber;
  }

  set maxPageNumber(value: number) {
    this._maxPageNumber = value;
  }

  get hasPreviousPage(): boolean {
    return this._hasPreviousPage;
  }

  set hasPreviousPage(value: boolean) {
    this._hasPreviousPage = value;
  }

  @Output()
  get requestPage(): EventEmitter<number> {
    return this._requestPage;
  }

  get hasNextPage(): boolean {
    return this._hasNextPage;
  }

  set hasNextPage(value: boolean) {
    this._hasNextPage = value;
  }

  public isCurrent(n:number):boolean {
    return n == this.page.number
  }

  get pagingDisplayOn(): boolean {
    return this._pagingDisplayOn;
  }

  set pagingDisplayOn(value: boolean) {
    this._pagingDisplayOn = value;
  }

  get recordsStart():number {
    if (this.page.number && this.page.number > 0 && this.page.size && this.page.size > 0) {
      return ((this.page.number -1) * this.page.size) + 1;
    } else {
      return 0;
    }
  }

  get recordsEnd():number {
    if (this.page.number && this.page.number > 0 && this.page.size && this.page.size > 0) {
      return ((this.page.number -1) * this.page.size) + this.page.items;
    } else {
      return 0;
    }
  }

  private createRange(size:number):number[] {
    let array = new Array(size);
    for (let i = 0; i < array.length; i++) {
      array[i] = i + 1;
    }
    return array;
  }

  onPreviousPage() {
    let previousPage = this.page.number - 1;
    this.requestPage.emit(previousPage);

  }

  onRequestPage(pageNumber:number) {
    this.requestPage.emit(pageNumber);
  }

  onNextPage() {
    let previousPage = this.page.number + 1;
    this.requestPage.emit(previousPage);
  }

}