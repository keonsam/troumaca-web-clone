import {Component, OnInit} from '@angular/core';
import {AssetService} from '../asset.service';
import {Assets} from '../assets';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'asset-list',
  templateUrl: './asset.list.component.html',
  styleUrls: ['./asset.list.component.css']
})
export class AssetListComponent implements OnInit {


  assetId: string;
  assets: Assets;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  routerLinkCreateAsset = '/assets/create';
  assetName: string;

  constructor(private assetService: AssetService) {
    const newAssets = new Assets();
    newAssets.page = new Page(0, 0, 0);
    newAssets.sort = new Sort();
    this.assets = newAssets;
  }


  ngOnInit(): void {
    this.getAssets();
  }

  private getAssets() {
    this.assetService.getAssets(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
      .subscribe(next => {
        this.assets = next;
      }, error => {
        console.log(error);
      }, () => {
        console.log('complete');
      });
  }


  onOpenModal(assetId: string, assetName: string) {
    this.assetId = assetId;
    this.assetName = assetName;
  }

  onDelete(deleted: boolean) {
    if (deleted) {
      this.assetService
        .deleteAsset(this.assetId)
        .subscribe(value => {
          if (value) {
            this.getAssets();
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
    this.getAssets();
  }
}
