import {Component, OnInit, ViewChild} from "@angular/core";
import {AssetTypeClassService} from "../asset.type.class.service";
import {AssetTypeClasses} from "../asset.type.classes";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";

@Component({
  selector: 'asset-type-class-list',
  templateUrl: './asset.type.class.list.component.html',
  styleUrls: ['./asset.type.class.list.component.css']
})

export class AssetTypeClassListComponent implements OnInit {

  private _headerNames:string[] = ["Name","Description"];
  private _assetTypeClasses: AssetTypeClasses;
  private _assetTypeClassId: string;
  private _index: number;

 constructor(private assetTypeClassService: AssetTypeClassService) {

   let assetTypeClasses:AssetTypeClasses = new AssetTypeClasses();
   assetTypeClasses.assetTypeClasses = [];
   assetTypeClasses.page = new Page(1, 10, 0);
   this.assetTypeClasses = assetTypeClasses;
 }

  ngOnInit(): void {
    this.assetTypeClassService.getAssetTypeClasses()
    .subscribe(assetTypeClasses => {
      console.log(assetTypeClasses);
      if (assetTypeClasses) {

        let newAssetTypeClasses:AssetTypeClasses = assetTypeClasses;
        if (!newAssetTypeClasses.page) {
          newAssetTypeClasses.page = new Page(1, 10, newAssetTypeClasses.assetTypeClasses.length);
        }

        if (!newAssetTypeClasses.sort) {
          newAssetTypeClasses.sort = new Sort();
        }

        this.assetTypeClasses = newAssetTypeClasses;
      }
    }, error => {
      console.log(error);
    }, () => {
      console.log("complete");
    });
  }

  public onRequestPage(pageNumber:number) {
  this.assetTypeClassService.getAssetTypeClasses(pageNumber)
      .subscribe(assetTypeClasses => {
        console.log(assetTypeClasses);
        if (assetTypeClasses) {
          let newAssetTypeClasses:AssetTypeClasses = assetTypeClasses;

          if (!newAssetTypeClasses.page) {
            newAssetTypeClasses.assetTypeClasses.length
            newAssetTypeClasses.page = new Page(1, 10, newAssetTypeClasses.assetTypeClasses.length);
          }
          if (!newAssetTypeClasses.sort) {
            newAssetTypeClasses.sort = new Sort();
          }

          this.assetTypeClasses = newAssetTypeClasses;
        }

      }, error => {
        console.log(error);
      }, () => {
        console.log("complete");
      });

  }

  get headerNames(): string[] {
    return this._headerNames;
  }

  set headerNames(value: string[]) {
    this._headerNames = value;
  }

  get assetTypeClasses(): AssetTypeClasses {
    return this._assetTypeClasses;
  }

  set assetTypeClasses(value: AssetTypeClasses) {
    this._assetTypeClasses = value;
  }

  get assetTypeClassId(): string {
    return this._assetTypeClassId;
  }

  set assetTypeClassId(value: string) {
    this._assetTypeClassId = value;
  }

  get index(): number {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
  }

  onResize(event) {
    console.log("W:" + event.target.innerWidth + " H:" + event.target.innerHeight);
  }

  onOk(assetTypeClassId,index){
    this.assetTypeClassId = assetTypeClassId;
    this.index = index;
  }

  onDelete() {
    this.assetTypeClassService.deleteAssetTypeClass(this.assetTypeClassId)
    .subscribe(data => {
      console.log(data);
      this.assetTypeClasses.assetTypeClasses.splice(this.index, 1);
    });
}

}
