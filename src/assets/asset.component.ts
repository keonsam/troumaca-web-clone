import {Component, OnInit} from '@angular/core';
import {faEdit, faEllipsisV, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Assets} from './assets';
import {DialogPosition, MatDialog} from '@angular/material';
import {AssetCreateModalComponent} from './asset-create-modal/asset.create.modal.component';
import {AssetService} from './asset.service';

@Component({
  selector: 'app-assets',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
  assets: Assets;
  constructor(public dialog: MatDialog,
              private assetService: AssetService) {
    this.assets = new Assets();
    this.assetService.onNewAsset.subscribe( val => {
      if (val) {
        this.openAssetCreate();
      }
    })
  }

  ngOnInit(): void {
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
}

