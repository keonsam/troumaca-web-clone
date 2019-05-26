import {Component, OnInit} from '@angular/core';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import {MatDialog, PageEvent} from '@angular/material';
import {AssetIdentifierTypes} from '../asset.identifier.types';
import {AssetIdentifierTypeService} from '../asset.identifier.type.service';
import {ActivatedRoute} from '@angular/router';
import {ASSET_IDENTIFIER_TYPE, ASSET_SETTING} from '../../app/routes';
import {DeleteModalComponent} from '../../delete-modal/delete.modal.component';

@Component({
  selector: 'app-asset-identifier-type-list',
  templateUrl: './asset.identifier.type.list.component.html',
  styleUrls: ['./asset.identifier.type.list.component.css']
})
export class AssetIdentifierTypeListComponent implements OnInit {


  assetIdentifierTypeId: string;
  assetIdentifierTypes: AssetIdentifierTypes;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  assetIdentifierTypeName: string;
  routerLink = `/${ASSET_SETTING}/${ASSET_IDENTIFIER_TYPE}`;
  newRoute = `${this.routerLink}/create`;

  constructor(private assetIdentifierTypeService: AssetIdentifierTypeService,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
    const assetIdentifierTypes = new AssetIdentifierTypes();
    assetIdentifierTypes.page = new Page(0, 0, 0);
    assetIdentifierTypes.sort = new Sort();
    this.assetIdentifierTypes = assetIdentifierTypes;
  }


  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['assetIdentifierTypes']) {
      this.assetIdentifierTypes = this.route.snapshot.data['assetIdentifierTypes'];
    }
  }

  private getAssetIdentifierTypes() {
    this.assetIdentifierTypeService.getAssetIdentifierTypes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
      .subscribe(next => {
        this.assetIdentifierTypes = next;
      }, error => {
        console.log(error);
      });
  }


  onOpenModal(assetIdentifierTypeId: string, assetIdentifierTypeName: string) {
    this.assetIdentifierTypeId = assetIdentifierTypeId;
    this.assetIdentifierTypeName = assetIdentifierTypeName;
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      maxWidth: '300px',
      data: {name: this.assetIdentifierTypeName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(result);
      }
    });
  }

  onDelete(deleted: boolean) {
    if (deleted) {
      this.assetIdentifierTypeService
        .deleteAssetIdentifierType(this.assetIdentifierTypeId)
        .subscribe(value => {
          if (value) {
            this.getAssetIdentifierTypes();
          }
        }, error => {
          console.log(error);
        });
    }
  }


  onRequestPage(pageEvent: PageEvent) {
    this.defaultPage = pageEvent.pageIndex + 1;
    this.defaultPageSize = pageEvent.pageSize;
    this.getAssetIdentifierTypes();
  }
}