import {Component, OnInit} from '@angular/core';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import {PageEvent} from '@angular/material';
import {AssetRoleTypes} from '../asset.role.types';
import {AssetRoleTypeService} from '../asset.role.type.service';
import {ActivatedRoute} from '@angular/router';
import {ASSET_ROLE_TYPE} from '../../app/routes';

@Component({
  selector: 'app-asset-role-type-list',
  templateUrl: './asset.role.type.list.component.html',
  styleUrls: ['./asset.role.type.list.component.css']
})
export class AssetRoleTypeListComponent implements OnInit {


  assetRoleTypeId: string;
  assetRoleTypes: AssetRoleTypes;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  assetRoleTypeName: string;

  newRoute = `${ASSET_ROLE_TYPE}/create`;

  constructor(private assetRoleTypeService: AssetRoleTypeService,
              private route: ActivatedRoute) {
    const assetRoleTypes = new AssetRoleTypes();
    assetRoleTypes.page = new Page(0, 0, 0);
    assetRoleTypes.sort = new Sort();
    this.assetRoleTypes = assetRoleTypes;
  }


  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['assetRoleTypes']) {
      this.assetRoleTypes = this.route.snapshot.data['assetRoleTypes'];
    }
  }

  private getAssetRoleTypes() {
    this.assetRoleTypeService.getAssetRoleTypes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
      .subscribe(next => {
        this.assetRoleTypes = next;
      }, error => {
        console.log(error);
      }, () => {
        console.log('complete');
      });
  }


  onOpenModal(assetRoleTypeId: string, assetRoleTypeName: string) {
    this.assetRoleTypeId = assetRoleTypeId;
    this.assetRoleTypeName = assetRoleTypeName;
  }

  onDelete(deleted: boolean) {
    if (deleted) {
      this.assetRoleTypeService
        .deleteAssetRoleType(this.assetRoleTypeId)
        .subscribe(value => {
          if (value) {
            this.getAssetRoleTypes();
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
    this.getAssetRoleTypes();
  }
}
