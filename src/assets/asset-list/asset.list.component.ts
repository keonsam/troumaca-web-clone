import {Component, OnDestroy, OnInit} from '@angular/core';
import {AssetService} from '../asset.service';
import {MatDialog} from '@angular/material';
import {Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Asset} from '../asset';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset.list.component.html',
  styleUrls: ['./asset.list.component.css']
})
export class AssetListComponent implements OnDestroy  {


  assetId: string;
  assets: Asset[] = [];
  listType = localStorage.getItem('defaultList') || 'list';
  private _destroyed$ = new Subject();
  pageSize = 10;
  search: string;
  lastPage: number;

  constructor(private assetService: AssetService,
              public dialog: MatDialog) {
    this.assetService.lastPage
      .subscribe( value => {
        this.lastPage = value;
      });
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
      if (val || val === '') {
        this.search = val;
        this.assetService.lastPage.next(0);
        this.getAssets(val, this.lastPage, this.pageSize, true);
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
        if (val && !newArr) {
          this.assets = this.assets.concat(val.assets);
        } else if (val && newArr) {
          this.assets = val.assets;
        }
      }, error => {
        console.error(error);
      });
  }

  handleRemove(index: number) {
    if (index !== null && index > -1) {
      this.assets.splice(index, 1);
    }
  }

  handleEdit(event: {index: number, asset: Asset}) {
    if ( event && event.index > -1) {
      this.assets[event.index] = event.asset;
    }
  }

  ngOnDestroy (): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  getAssetsEvent(next: boolean) {
    if (next) {
      this.getAssets(this.search, this.lastPage, this.pageSize);
    }
  }
}
