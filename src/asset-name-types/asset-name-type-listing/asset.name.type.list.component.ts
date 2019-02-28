import {Component, OnInit} from '@angular/core';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import {MatDialog, PageEvent} from '@angular/material';
import {AssetNameTypes} from '../asset.name.types';
import {AssetNameTypeService} from '../asset.name.type.service';
import {ActivatedRoute} from '@angular/router';
import {ASSET_NAME_TYPE, ASSET_SETTING} from '../../app/routes';
import {DeleteModalComponent} from '../../delete-modal/delete.modal.component';

@Component({
  selector: 'app-asset-name-type-list',
  templateUrl: './asset.name.type.list.component.html',
  styleUrls: ['./asset.name.type.list.component.css']
})
export class AssetNameTypeListComponent implements OnInit {


  assetNameTypeId: string;
  assetNameTypes: AssetNameTypes;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  assetNameTypeName: string;
  routerLink = `/${ASSET_SETTING}/${ASSET_NAME_TYPE}`;
  newLink = `${this.routerLink}/create`;


  constructor(private assetNameTypeService: AssetNameTypeService,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
    const assetNameTypes = new AssetNameTypes();
    assetNameTypes.page = new Page(0, 0, 0);
    assetNameTypes.sort = new Sort();
    this.assetNameTypes = assetNameTypes;
  }


  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['assetNameTypes']) {
      this.assetNameTypes = this.route.snapshot.data['assetNameTypes'];
    }
  }

  private getAssetNameTypes() {
    this.assetNameTypeService.getAssetNameTypes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
      .subscribe(next => {
        this.assetNameTypes = next;
      }, error => {
        console.log(error);
      }, () => {
        console.log('complete');
      });
  }


  onOpenModal(assetNameTypeId: string, assetNameTypeName: string) {
    this.assetNameTypeId = assetNameTypeId;
    this.assetNameTypeName = assetNameTypeName;
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      maxWidth: '300px',
      data: {name: this.assetNameTypeName}
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
      this.assetNameTypeService
        .deleteAssetNameType(this.assetNameTypeId)
        .subscribe(value => {
          if (value) {
            this.getAssetNameTypes();
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
    this.getAssetNameTypes();
  }
}
