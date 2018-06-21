import {Component, OnInit} from '@angular/core';
import {AssetService} from '../asset.service';
import {Assets} from '../assets';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';

@Component({
  selector: 'asset-list',
  templateUrl: './asset.list.component.html',
  styleUrls: ['./asset.list.component.css']
})
export class AssetListComponent implements OnInit {


  private assetId: string;
  private _assets: Assets;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  private _routerLinkCreateAsset = '/assets/create';
  private _assetName: string;

  constructor(private assetService: AssetService) {
    const newAssets = new Assets();
    newAssets.page = new Page(0, 0, 0);
    newAssets.sort = new Sort();
    this.assets = newAssets;
  }


  ngOnInit(): void {
    this.getAssets();
}

  getAssets() {
    this.assetService.getAssets(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
    .subscribe(next => {
      this.assets = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });
  }

  get assetName(): string {
    return this._assetName;
  }

  set assetName(value: string) {
    this._assetName = value;
  }

  get assets(): Assets {
    return this._assets;
  }

  set assets(value: Assets) {
    this._assets = value;
  }

  get routerLinkCreateAsset(): string {
    return this._routerLinkCreateAsset;
  }

  set routerLinkCreateAsset(value: string) {
    this._routerLinkCreateAsset = value;
  }

  onOpenModal(assetId: string, assetName: string) {
    this.assetId = assetId;
    this.assetName = assetName;
  }

  onDelete() {
    this.assetService
    .deleteAsset(this.assetId)
    .subscribe(value => {
    this.getAssets();
    }, error => {
    console.log(error);
    }, () => {
    console.log('complete');
  });
  }


  onRequestPage(pageNumber: number) {
   this.defaultPage = pageNumber;
   this.getAssets();
  }
}
/*   onResize(event) {
    console.log("W:" + event.target.innerWidth + " H:" + event.target.innerHeight);
  } */
