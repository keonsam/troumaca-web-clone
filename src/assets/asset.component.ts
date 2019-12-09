import {Component, OnDestroy, OnInit} from '@angular/core';
import {faEdit, faEllipsisV, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Assets} from './assets';
import {DialogPosition, MatDialog} from '@angular/material';
import {AssetCreateModalComponent} from './asset-create-modal/asset.create.modal.component';
import {AssetService} from './asset.service';
import {AssetTypeCreateModalComponent} from './asset-type/create-modal-component/asset.type.create.modal.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-assets',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit, OnDestroy {
  assets: Assets;
  private _destroyed$ = new Subject();

  constructor(public dialog: MatDialog,
              private assetService: AssetService) {
    this.assets = new Assets();
    this.assetService.onNewAsset
      .pipe(
        takeUntil(this._destroyed$)
      ).subscribe( val => {
      if (val) {
        this.openAssetCreate();
      }
    });

    this.assetService.onNewAssetType
      .pipe(
        takeUntil(this._destroyed$)
      ).subscribe( val => {
      if (val) {
        this.openAssetTypeCreate();
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy (): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  private openAssetCreate() {
    const dialogPosition: DialogPosition = {
      top: '0',
      left: '0'
    };
    const dialogRef = this.dialog.open(AssetCreateModalComponent,  {
      height: '100%',
      position: dialogPosition,
      hasBackdrop: true,
      backdropClass: 'backdrop',
      closeOnNavigation: true,
      disableClose: false,
      panelClass: ['left-panel'],
    });
  }

  private openAssetTypeCreate() {
    const dialogPosition: DialogPosition = {
      top: '0',
      left: '0'
    };
    const dialogRef = this.dialog.open(AssetTypeCreateModalComponent,  {
      height: '100%',
      position: dialogPosition,
      hasBackdrop: true,
      backdropClass: 'backdrop',
      closeOnNavigation: true,
      disableClose: false,
      panelClass: ['left-panel'],
    });
  }
}

