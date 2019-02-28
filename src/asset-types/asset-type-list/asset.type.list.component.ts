import {Component, OnInit} from '@angular/core';
import {AssetTypes} from '../asset.types';
import {AssetTypeService} from '../asset.type.service';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import { ASSET_TYPE } from '../../app/routes';
import {MatDialog, PageEvent} from '@angular/material';
import {DeleteModalComponent} from '../../delete-modal/delete.modal.component';

@Component({
  selector: 'asset-type-list',
  templateUrl: './asset.type.list.component.html',
  styleUrls: ['./asset.type.list.component.css']
})
export class AssetTypeListComponent implements OnInit {

  assetTypes: AssetTypes;
  routerLinkCreateAssetType = `/${ASSET_TYPE}/create`;
  assetTypeName: string;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  private assetTypeId: string;


  constructor(private assetTypeService: AssetTypeService,
              public dialog: MatDialog) {

     const newAssetTypes = new AssetTypes();
     newAssetTypes.page = new Page(0, 0, 0);
     newAssetTypes.sort = new Sort();
     this.assetTypes = newAssetTypes;
  }

  ngOnInit(): void {
    this.getAssetTypes();
  }

  private getAssetTypes () {
    this.assetTypeService
    .getAssetTypes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
    .subscribe(next => {
      this.assetTypes = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });
  }

  onOpenModal(assetTypeId: string, assetTypeName: string) {
    this.assetTypeId = assetTypeId;
    this.assetTypeName = assetTypeName;
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      maxWidth: '300px',
      data: {name: this.assetTypeName}
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
      this.assetTypeService
        .deleteAssetType(this.assetTypeId)
        .subscribe(value => {
          if (value) {
            this.getAssetTypes();
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
   this.getAssetTypes();
  }

}
