import {Component, OnInit} from '@angular/core';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import {DepreciationService} from "../depreciation.service";
import {DepreciationArr} from "../depreciation.arr";

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  private _depreciationId: string;
  private _depreciationName: string;
  private _depreciationArr: DepreciationArr;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  private _routerLinkCreateDepreciation = '/depreciation/create';

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
    this.depreciationService.getDepreciationArr(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
      .subscribe(next => {
        next.depreciation.forEach(value => {
          const currentDepreciation = this.getCurrentDepreciation(value);
          value.currentDepreciation = currentDepreciation.toString();
          const cumulativeDep = this.getCumulativeDepreciation(value, currentDepreciation);
          value.cumulativeDepreciation = cumulativeDep.toString();
          value.bookValue = (parseFloat(value.cost) - cumulativeDep).toString();
        });
        this.depreciationArr = next;
      }, error => {
        console.log(error);
      }, () => {
        console.log('complete');
      });
  }

  doubleDeclining(cost, usefulLife, times?: number) {
    let bookValue = cost;
    // const currentDate = new Date();
    // const incDate: Date = purchaseDate;
    const depRate = (1 / usefulLife) * 2;
    const currentDep =  Math.round(bookValue * (depRate) * 100) / 100;
    bookValue = Math.round((bookValue - currentDep) * 100) / 100;
    times--;
    if (times < 1) {
      return currentDep;
    }else {
      return this.doubleDeclining(bookValue, usefulLife, times);
    }
  }

  getDoubleDeclining(cost, usefulLife, purchaseDate, currentDepYear?: number) {
    if (!currentDepYear) {
      const currentDate = new Date();
     let times = 1;
      const incDate: Date = purchaseDate;
      incDate.setFullYear(incDate.getFullYear() + 1);
      while (times < usefulLife && currentDate > incDate) {
        times++;
        incDate.setFullYear(incDate.getFullYear() + 1);
      }
      return this.doubleDeclining(cost, usefulLife, times);
    }else {
      let bookValue = cost;
      let cumulativeDep = 0;
      for (let i = 0; i < currentDepYear; i++) {
        cumulativeDep = Math.round( (cumulativeDep + this.doubleDeclining(bookValue, usefulLife, 1)) * 100) / 100;
        bookValue = Math.round((cost - cumulativeDep) * 100) / 100;
        console.log(bookValue);
      }
      return cumulativeDep;
    }
  }

  unitOfProduction(cost, salvageVal, unitProduced, totalUnits) {
    const baseDep = Math.round((cost - salvageVal) * 100) / 100;
    const baseRate = Math.round((baseDep / totalUnits) * 100) / 100;
    // if (cumulative) {
    //   let cumulativeDep = 0;
    //   for (let i = 1; i <= unitProduced.length; i++) {
    //     cumulativeDep = Math.round((cumulativeDep + (baseRate * unitProduced[i])) * 100) / 100;
    //     console.log(cumulativeDep);
    //   }
    //   return cumulativeDep;
    // }
    return  Math.round((baseRate * unitProduced) * 100) / 100;
  }

  getCumulativeUnitOfProd(cost, salvageVal, unitProduced, totalUnits) {
    let cumulative = 0;
    for (let i = 0; i < unitProduced.length; i++) {
      cumulative = Math.round((cumulative + this.unitOfProduction(cost, salvageVal, unitProduced[i], totalUnits)) * 100) / 100;
    }
    return cumulative;
  }

  findRemainingYears(usefulLife, purchaseDate) {
    const incDate = purchaseDate;
    incDate.setFullYear( incDate.getFullYear() + 1);
    const currentDate = new Date();
    let remainingLife = usefulLife;
    while (currentDate > incDate && remainingLife < 1) {
      remainingLife--;
      incDate.setFullYear( incDate.getFullYear() + 1);
    }
    return remainingLife;
  }

  sumOfYears(cost, salvageVal, usefulLife, purchaseDate, currentDepYear?: number) {
    const baseDep = Math.round((cost - salvageVal) * 100) / 100;
    const remainingYears = this.findRemainingYears(usefulLife, purchaseDate);
    const sumOfYears = (usefulLife * (usefulLife + 1)) / 2;
    if (currentDepYear) {
      let cumulativeDep = 0;
      for ( let i = 0; i < currentDepYear; i++) {
        const reYears = usefulLife - i;
        const dep = Math.round(baseDep * (reYears / sumOfYears) * 100) / 100;
        cumulativeDep = Math.round((cumulativeDep + dep) * 100) / 100;
      }
      return cumulativeDep;
    }
    return Math.round(baseDep * (remainingYears / sumOfYears) * 100) / 100;
  }

  getCurrentDepreciation(depreciation) {
    const cost: number = parseFloat(depreciation.cost);
    const salvageVal: number = parseFloat(depreciation.salvageVal);
    const usefulLife: number = parseFloat(depreciation.usefulLife);
    const unitProduced: number[] = depreciation.unitProduced.map( x => parseFloat(x));
    const totalUnits: number = parseFloat(depreciation.totalUnits);
    const purchaseDate: Date = new Date(depreciation.purchaseDate);
    let currentDep = 0;
    switch (depreciation.method) {
      case 'straight-line':
      currentDep = Math.round((cost - salvageVal) / usefulLife * 100) / 100;
      break;
      case 'double-declining-method':
      currentDep = this.getDoubleDeclining(cost, usefulLife, purchaseDate);
      break;
      case 'unit-of-production':
      currentDep = this.unitOfProduction(cost, salvageVal, unitProduced[unitProduced.length - 1], totalUnits);
      break;
      case 'sum-of-the-years-digits':
      currentDep = this.sumOfYears(cost, salvageVal, usefulLife, purchaseDate);
    }
    return currentDep;
  }

  getCumulativeDepreciation(depreciation, currentDep) {
    const cost: number = parseFloat(depreciation.cost);
    const salvageVal: number = parseFloat(depreciation.salvageVal);
    const usefulLife: number = parseFloat(depreciation.usefulLife);
    const unitProduced: number[] = depreciation.unitProduced.map(x => parseFloat(x));
    const totalUnits: number = parseFloat(depreciation.totalUnits);
    const purchaseDate: Date = new Date(depreciation.purchaseDate);
    const currentDate = new Date();
    const incDate: Date = purchaseDate;
    let currentDepYear = 1;
    incDate.setFullYear(incDate.getFullYear() + 1);
    while (currentDepYear < usefulLife && currentDate > incDate) {
      currentDepYear++;
      incDate.setFullYear(incDate.getFullYear() + 1);
    }

    let cumulativeDep = 0;
    switch (depreciation.method) {
      case 'straight-line':
        cumulativeDep = Math.round(currentDep * currentDepYear * 100) / 100;
        break;
      case 'double-declining-method':
         cumulativeDep = this.getDoubleDeclining(cost, usefulLife, purchaseDate, currentDepYear);
        // cumulativeDep = 0;
        break;
      case 'unit-of-production':
        cumulativeDep = this.getCumulativeUnitOfProd(cost, salvageVal, unitProduced, totalUnits);
        break;
      case 'sum-of-the-years-digits':
        cumulativeDep = this.sumOfYears(cost, salvageVal, usefulLife, purchaseDate, currentDepYear);
    }
    return cumulativeDep;
  }

  onOpenModal(depreciationId: string, depreciationName: string) {
    this.depreciationId = depreciationId;
    this.depreciationName = depreciationName;
  }

  onDelete() {
    this.depreciationService
    .deleteDepreciation(this.depreciationId)
    .subscribe(value => {
    this.getDepreciationArr();
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
