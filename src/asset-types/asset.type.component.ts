import {Component, OnInit} from "@angular/core";
import {AssetTypeService} from "./asset.type.service";
import {AssetType} from "../assets/asset.type";

@Component({
  selector: 'asset-types',
  templateUrl: './asset.type.component.html',
  styleUrls: ['./asset.type.component.css']
})
export class AssetTypeComponent implements OnInit {

  private _assetTypes:AssetType[];

  constructor(private assetTypeService:AssetTypeService) {
  }

  ngOnInit(): void {
    this.assetTypeService
      .getAssetTypes()
      .subscribe(assetTypes => {
        console.log(assetTypes);
        this._assetTypes = assetTypes;
      }, error => {

      }, () => {

      });
  }

  get assetTypes(): AssetType[] {
    return this._assetTypes;
  }

  set assetTypes(value: AssetType[]) {
    this._assetTypes = value;
  }

}