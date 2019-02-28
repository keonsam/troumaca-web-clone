import {Component, OnInit} from '@angular/core';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import {MatDialog, PageEvent} from '@angular/material';
import {UnitOfMeasures} from '../unit.of.measures';
import {UnitOfMeasureService} from '../unit.of.measure.service';
import {ActivatedRoute} from '@angular/router';
import {ASSET_SETTING, UNIT_OF_MEASURE} from '../../app/routes';
import {DeleteModalComponent} from '../../delete-modal/delete.modal.component';

@Component({
  selector: 'app-asset-role-type-list',
  templateUrl: './unit.of.measure.list.component.html',
  styleUrls: ['./unit.of.measure.list.component.css']
})
export class UnitOfMeasureListComponent implements OnInit {


  unitOfMeasureId: string;
  unitOfMeasures: UnitOfMeasures;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  unitOfMeasureName: string;

  routerLink = `/${ASSET_SETTING}/${UNIT_OF_MEASURE}`;
  newLink = `${this.routerLink}/create`;

  constructor(private unitOfMeasureService: UnitOfMeasureService,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
    const unitOfMeasures = new UnitOfMeasures();
    unitOfMeasures.page = new Page(0, 0, 0);
    unitOfMeasures.sort = new Sort();
    this.unitOfMeasures = unitOfMeasures;
  }


  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['unitOfMeasures']) {
      this.unitOfMeasures = this.route.snapshot.data['unitOfMeasures'];
    }
  }

  private getUnitOfMeasures() {
    this.unitOfMeasureService.getUnitOfMeasures(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
      .subscribe(next => {
        this.unitOfMeasures = next;
      }, error => {
        console.log(error);
      }, () => {
        console.log('complete');
      });
  }


  onOpenModal(unitOfMeasureId: string, unitOfMeasureName: string) {
    this.unitOfMeasureId = unitOfMeasureId;
    this.unitOfMeasureName = unitOfMeasureName;
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      maxWidth: '300px',
      data: {name: this.unitOfMeasureName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.onDelete(result);
      }
    });
  }

  onDelete(deleted: boolean) {
    if (deleted) {
      this.unitOfMeasureService
        .deleteUnitOfMeasure(this.unitOfMeasureId)
        .subscribe(value => {
          if (value) {
            this.getUnitOfMeasures();
          }
        }, error => {
          console.log(error);
        }, () => {
          console.log('complete');
        });
    }
  }


  onRequestPage(pageEvent: PageEvent) {
    this.defaultPage = pageEvent.pageIndex + 1;
    this.defaultPageSize = pageEvent.pageSize;
    this.getUnitOfMeasures();
  }
}
