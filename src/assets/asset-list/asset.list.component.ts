import {Component, OnInit} from "@angular/core";
import {AssetService} from "../asset.service";
import {Assets} from "../assets";

@Component({
  selector: 'asset-list',
  templateUrl: './asset.list.component.html',
  styleUrls: ['./asset.list.component.css']
})
export class AssetListComponent implements OnInit {

  private _headerNames:string[] = [];
  private _assets:Assets;

  constructor(private assetService:AssetService) {
    this.assets = new Assets();
    this.assets.assets = [];
  }

  ngOnInit(): void {
    this.assetService.getAssets()
    .subscribe(next => {
      console.log(next);
      this.assets = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log("complete");
    });

    this.headerNames = [
      "Classification",
      "Name",
      "Description"
    ];
  }

  public onRequestPage(pageNumber:number) {
    this.assetService.getAssets(pageNumber)
      .subscribe(next => {
        console.log(next);
        this.assets = next;
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

  get assets(): Assets {
    return this._assets;
  }

  set assets(value: Assets) {
    this._assets = value;
  }

  onResize(event) {
    console.log("W:" + event.target.innerWidth + " H:" + event.target.innerHeight);
  }

}
