import {Component, OnDestroy, OnInit} from '@angular/core';
import {AssetService} from '../asset.service';
import {Assets} from '../assets';
import {MatDialog} from '@angular/material';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Asset} from '../asset';
import {AssetsDataSource} from '../assets.data.source';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset.list.component.html',
  styleUrls: ['./asset.list.component.css']
})
export class AssetListComponent implements OnInit, OnDestroy  {


  assetId: string;
  // assets: AssetsDataSource;
  assets: Asset[] = [];
  listType = localStorage.getItem('defaultList') || 'list';
  private _destroyed$ = new Subject();
  pageSize = 10;
  search: string;

  constructor(private assetService: AssetService,
              public dialog: MatDialog) {
    // this.assets = new AssetsDataSource(assetService, this.listSize[this.listType]);
    this.assetService.listType
      .pipe(
        takeUntil(this._destroyed$)
      ).subscribe( val => {
      if (val) {
        this.listType = val;
      }
    });

    this.assetService.search
      .pipe(
        takeUntil(this._destroyed$)
      ).subscribe( val => {
        console.log("testing ");
      if (val || val === '') {
        console.log("testing2");
        this.search = val;
        this.getAssets(val, 0, this.pageSize, true);
      }
    });
    this.getAssets()
  }

  private getAssets(search?: string, lastPage: number= 0, pageSize: number = 10, newArr?: boolean) {
    this.assetService.getAssets(search, lastPage, pageSize)
      .pipe(
        takeUntil(this._destroyed$)
      )
      .subscribe( val => {
        console.log(val);
        if (val && !newArr) {
          this.assets = this.assets.concat(val.assets);
        } else if (val && newArr) {
          this.assets = val.assets;
        }
      }, error => {
        console.error(error);
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy (): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  getAssetsEvent(lastPage: number) {
    this.getAssets(this.search, lastPage, this.pageSize);
  }

  handleDetails(id: string) {
    this.assetService.onOpenDetails.next(id);
  }
}
