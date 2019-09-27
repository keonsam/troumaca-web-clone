import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AssetService} from '../asset.service';
import {Assets} from '../assets';
import {MatDialog} from '@angular/material';
import {faEdit, faEllipsisV, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset.list.component.html',
  styleUrls: ['./asset.list.component.css']
})
export class AssetListComponent implements OnInit {


  assetId: string;
  assets: Assets;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faEllipsisV = faEllipsisV;
  listType= 'list';
  @Output() onNewAsset: EventEmitter<boolean> = new EventEmitter();

  constructor(private assetService: AssetService,
              public dialog: MatDialog) {
    this.assets = new Assets();
    this.assetService.listType.subscribe( val => {
      if (val) {
        this.listType = val;
      }
    })
  }


  ngOnInit(): void {
    this.getAssets();
  }

  openAssetCreate() {
    this.onNewAsset.emit(true);
  }

  private getAssets(search?: string) {
    this.assetService.getAssets(search)
      .subscribe( val => {
        this.assets = val;
      }, error => {
        console.log(error);
      });
  }
}
