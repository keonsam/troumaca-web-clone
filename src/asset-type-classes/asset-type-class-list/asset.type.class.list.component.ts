import {Component, NgZone, OnInit} from '@angular/core';
import {AssetTypeClassService} from '../asset.type.class.service';
import {AssetTypeClasses} from '../asset.type.classes';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';

@Component({
  selector: 'asset-type-class-list',
  templateUrl: './asset.type.class.list.component.html',
  styleUrls: ['./asset.type.class.list.component.css']
})

export class AssetTypeClassListComponent implements OnInit {

  private assetTypeClassId: string;
  private _assetTypeClasses: AssetTypeClasses;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  private _routerLinkCreateAssetTypeClass = '/asset-type-classes/create';
  private _assetTypeClassName: string;

 constructor(private assetTypeClassService: AssetTypeClassService,
             private zone: NgZone) {

    const newAssetTypeClasses = new AssetTypeClasses();
    newAssetTypeClasses.page = new Page(0, 0, 0);
    newAssetTypeClasses.sort = new Sort();
    this.assetTypeClasses = newAssetTypeClasses;
 }

  ngOnInit(): void {
      this.getAssetTypeClasses();
  }

  getAssetTypeClasses() {
    this.assetTypeClassService
    .getAssetTypeClasses(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
    .subscribe(next => {
      this.zone.run(() => {
        this.assetTypeClasses = next;
      });
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });
  }

  get assetTypeClassName(): string {
    return this._assetTypeClassName;
  }

  set assetTypeClassName(value: string) {
    this._assetTypeClassName = value;
  }

  get assetTypeClasses(): AssetTypeClasses {
    return this._assetTypeClasses;
  }

  set assetTypeClasses(value: AssetTypeClasses) {
    this._assetTypeClasses = value;
  }

  get routerLinkCreateAssetTypeClass(): string {
    return this._routerLinkCreateAssetTypeClass;
  }

  set routerLinkCreateAssetTypeClass(value: string) {
    this._routerLinkCreateAssetTypeClass = value;
  }

  onResize(event) {
    console.log('W:' + event.target.innerWidth + ' H:' + event.target.innerHeight);
  }

  onOpenModal(assetTypeClassId: string, assetTypeClassName: string){
    this.assetTypeClassId = assetTypeClassId;
    this.assetTypeClassName = assetTypeClassName;
  }

  onRequestPage(pageNumber: number) {
  this.defaultPage = pageNumber;
  this.getAssetTypeClasses();
  }

  onDelete(deleted?: boolean) {
    if (deleted) {
      this.assetTypeClassService
        .deleteAssetTypeClass(this.assetTypeClassId)
        .subscribe(value => {
          if (value) {
            this.getAssetTypeClasses();
          }
        }, error => {
          console.log(error);
        }, () => {
          console.log('complete');
        });
    }
}

}
