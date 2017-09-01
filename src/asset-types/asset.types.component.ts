import {Component, OnInit} from "@angular/core";
import {AssetTypesService} from "./asset.types.service";
import {AssetTypeModel} from "./asset.types.model";

@Component({
  selector: 'asset-types',
  templateUrl: './asset.types.component.html',
  styleUrls: ['./asset.types.component.css']
})
export class AssetTypesComponent implements OnInit {

  private _assetTypeModels:AssetTypeModel[];

  constructor(private assetTypesService:AssetTypesService) {
  }

  ngOnInit(): void {
    this.assetTypesService
      .getAssetTypes()
      .subscribe(assetTypes => {
        console.log(assetTypes);
        this._assetTypeModels = assetTypes;
      }, error => {

      }, () => {

      });
  }


  get assetTypeModels(): AssetTypeModel[] {
    return this._assetTypeModels;
  }

  set assetTypeModels(value: AssetTypeModel[]) {
    this._assetTypeModels = value;
  }
}