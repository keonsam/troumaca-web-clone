import {Component, OnInit} from '@angular/core';
import {AssetTypes} from '../asset.types';
import {AssetTypeService} from '../asset.type.service';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';

@Component({
  selector: 'asset-type-list',
  templateUrl: './asset.type.list.component.html',
  styleUrls: ['./asset.type.list.component.css']
})
export class AssetTypeListComponent implements OnInit {

  private assetTypeId: string;
  private _assetTypes: AssetTypes;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  private _routerLinkCreateAssetType = '/asset-types/create';
  private _assetTypeName: string;

  constructor(private assetTypeService: AssetTypeService) {

     const newAssetTypes = new AssetTypes();
     newAssetTypes.page = new Page(0, 0, 0);
     newAssetTypes.sort = new Sort();
     this.assetTypes = newAssetTypes;
  }

  ngOnInit(): void {
    this.getAssetTypes();
  }

  get assetTypeName(): string {
    return this._assetTypeName;
  }

  set assetTypeName(value: string) {
    this._assetTypeName = value;
  }

  get assetTypes(): AssetTypes {
    return this._assetTypes;
  }

  set assetTypes(value: AssetTypes) {
    this._assetTypes = value;
  }

  get routerLinkCreateAssetType(): string {
    return this._routerLinkCreateAssetType;
  }

  set routerLinkCreateAssetType(value: string) {
    this._routerLinkCreateAssetType = value;
  }

  getAssetTypes () {
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

  onRequestPage(pageNumber: number) {
   this.defaultPage = pageNumber;
   this.getAssetTypes();
  }

}
