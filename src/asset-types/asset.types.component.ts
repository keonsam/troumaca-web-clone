import {Component, OnInit} from "@angular/core";
import {AssetTypesService} from "./asset.types.service";
import {AssetType} from "../assets/asset.type";

@Component({
  selector: 'asset-types',
  templateUrl: './asset.types.component.html',
  styleUrls: ['./asset.types.component.css']
})
export class AssetTypesComponent implements OnInit {

  private _assetTypes:AssetType[];

  constructor(private assetTypesService:AssetTypesService) {
  }

  ngOnInit(): void {
    this.assetTypesService
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