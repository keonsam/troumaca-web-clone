import {Component, OnInit} from "@angular/core";
import {AssetTypes} from "../../assets/asset.types";
import {AssetTypeService} from "../asset.type.service";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'asset-type-list',
  templateUrl: './asset.type.list.component.html',
  styleUrls: ['./asset.type.list.component.css']
})
export class AssetTypeListComponent implements OnInit {

  private assetTypeId: string;
  private _assetTypes: AssetTypes;
  private defaultPage:number = 1;
  private defaultPageSize:number = 10;
  private defaultSortOrder = "asc";
  private _routerLinkCreateAssetType:string = "/asset-types/create";

  constructor(private assetTypeService: AssetTypeService,
              private router: Router) {

     let newAssetTypes = new AssetTypes();
     newAssetTypes.page = new Page(0, 0, 0);
     newAssetTypes.sort = new Sort();
     this.assetTypes = newAssetTypes;
  }

  ngOnInit(): void {
    this.getAssetTypes();
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
      console.log(next);
      this.assetTypes = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log("complete");
    });
  }

  onOpenModal(assetTypeId: string) {
    this.assetTypeId = assetTypeId
  }

  onDelete() {
    this.assetTypeService
    .deleteAssetType(this.assetTypeId)
    .subscribe(value => {
    this.getAssetTypes();
    }, error => {
    console.log(error);
    }, () => {
    console.log("complete");
    });
  }

  onRequestPage(pageNumber:number) {
   this.defaultPage = pageNumber;
   this.getAssetTypes();
  }

}
