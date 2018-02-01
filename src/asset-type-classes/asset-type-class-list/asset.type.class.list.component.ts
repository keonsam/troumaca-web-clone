import {Component, OnInit, ViewChild} from "@angular/core";
import {AssetTypeClassService} from "../asset.type.class.service";
import {AssetTypeClasses} from "../asset.type.classes";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'asset-type-class-list',
  templateUrl: './asset.type.class.list.component.html',
  styleUrls: ['./asset.type.class.list.component.css']
})

export class AssetTypeClassListComponent implements OnInit {

  private assetTypeClassId: string;
  private _assetTypeClasses: AssetTypeClasses;
  private defaultPage:number = 1;
  private defaultPageSize:number = 10;
  private defaultSortOrder = "asc";

 constructor(private assetTypeClassService: AssetTypeClassService,
             private router: Router) {

    let newAssetTypeClasses = new AssetTypeClasses();
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
      console.log(next);
      this.assetTypeClasses = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log("complete");
    });
  }

  get assetTypeClasses(): AssetTypeClasses {
    return this._assetTypeClasses;
  }

  set assetTypeClasses(value: AssetTypeClasses) {
    this._assetTypeClasses = value;
  }

  onResize(event) {
    console.log("W:" + event.target.innerWidth + " H:" + event.target.innerHeight);
  }

  onOpenModal(assetTypeClassId: string){
    this.assetTypeClassId = assetTypeClassId;
  }

  onRequestPage(pageNumber:number) {
  this.defaultPage = pageNumber;
  this.getAssetTypeClasses();
  }

  onDelete() {
    this.assetTypeClassService
    .deleteAssetTypeClass(this.assetTypeClassId)
    .subscribe(value => {
    this.getAssetTypeClasses();
    }, error => {
    console.log(error);
    }, () => {
    console.log("complete");
    });
}

}
