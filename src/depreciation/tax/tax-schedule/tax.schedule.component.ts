import {Component, OnInit} from '@angular/core';
import {Page} from '../../../page/page';
import {Sort} from '../../../sort/sort';
import {DepreciationService} from '../../depreciation.service';
import {DepreciationArr} from '../../depreciation.arr';

@Component({
  selector: 'tax-schedule',
  templateUrl: './tax.schedule.component.html',
  styleUrls: ['./tax.schedule.component.css']
})
export class TaxScheduleComponent implements OnInit {

  private _depreciationId: string;
  private _depreciationName: string;
  private _depreciationArr: DepreciationArr;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  private _routerLinkCreateDepreciation = '/depreciation/tax/create';

  constructor(private depreciationService: DepreciationService) {
    const depreciationArr = new DepreciationArr();
    depreciationArr.page = new Page(0, 0, 0);
    depreciationArr.sort = new Sort();
    this.depreciationArr = depreciationArr;
  }


  ngOnInit(): void {
    this.getDepreciationArr();
  }

  get routerLinkCreateDepreciation(): string {
    return this._routerLinkCreateDepreciation;
  }

  set routerLinkCreateDepreciation(value: string) {
    this._routerLinkCreateDepreciation = value;
  }

  get depreciationArr(): DepreciationArr {
    return this._depreciationArr;
  }

  set depreciationArr(value: DepreciationArr) {
    this._depreciationArr = value;
  }

  get depreciationId(): string {
    return this._depreciationId;
  }

  set depreciationId(value: string) {
    this._depreciationId = value;
  }

  get depreciationName(): string {
    return this._depreciationName;
  }

  set depreciationName(value: string) {
    this._depreciationName = value;
  }

  getDepreciationArr() {
    this.depreciationService.getDepreciationArr(this.defaultPage, this.defaultPageSize, this.defaultSortOrder, 'tax')
      .subscribe(next => {
        this.depreciationArr = next;
      }, error => {
        console.log(error);
      }, () => {
        console.log('complete');
      });
  }

  onOpenModal(depreciationId: string, depreciationName: string) {
    this.depreciationId = depreciationId;
    this.depreciationName = depreciationName;
  }

  onDelete() {
    this.depreciationService
    .deleteDepreciation(this.depreciationId, 'tax')
    .subscribe(value => {
      if (value) {
        this.getDepreciationArr();
      }
    }, error => {
    console.log(error);
    }, () => {
    console.log('complete');
  });
  }


  onRequestPage(pageNumber: number) {
   this.defaultPage = pageNumber;
   this.getDepreciationArr();
  }
}
