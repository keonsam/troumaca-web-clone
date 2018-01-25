import {Component, OnInit} from "@angular/core";
import {AssetTypeClassService} from "../asset.type.class.service";
import {AssetTypeClasses} from "../asset.type.classes";

@Component({
  selector: 'asset-type-class-list',
  templateUrl: './asset.type.class.list.component.html',
  styleUrls: ['./asset.type.class.list.component.css']
})
export class AssetTypeClassListComponent implements OnInit {
  private _headerNames:string[] = [];
  private _assetTypeClasses: AssetTypeClasses;

 constructor(private assetTypeClassService: AssetTypeClassService){
   this.assetTypeClass = new AssetTypeClasses();
   this.assetTypeClass.assetTypeClasses = [];
 }

  ngOnInit(): void {
    this.assetTypeClassService.getAssetTypeClasses()
    .subscribe(next => {
      console.log(next);
      this.assetTypeClass = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log("complete");
    });
  }

  public onRequestPage(pageNumber:number) {
  this.assetTypeClassService.getAssetTypeClasses(pageNumber)
      .subscribe(next => {
        console.log(next);
        this.assetTypeClass = next;
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

  get assetTypeClass(): AssetTypeClasses {
    return this._assetTypeClasses;
  }

  set assetTypeClass(value: AssetTypeClasses) {
    this._assetTypeClasses = value;
  }

  onResize(event) {
    console.log("W:" + event.target.innerWidth + " H:" + event.target.innerHeight);
  }

}
