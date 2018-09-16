import {Component, OnInit} from '@angular/core';
import {AssetTypeClassService} from './asset.type.class.service';
import {AssetTypeClass} from './asset.type.class';

@Component({
  selector: 'asset-type-class',
  templateUrl: './asset.type.class.component.html',
  styleUrls: ['./asset.type.class.component.css']
})
export class AssetTypeClassComponent implements OnInit {

  private _assetTypeModels: AssetTypeClass[];

  constructor(private assetTypeClassService: AssetTypeClassService) {
  }

  ngOnInit(): void {
    // this.assetTypeClassService
    //   .getAssetTypeClasses()
    //   .subscribe(assetTypeClass => {
    //     console.log(assetTypeClass);
    //     this._assetTypeModels = assetTypeClass;
    //   }, error => {
    //
    //   }, () => {
    //
    //   });
  }


  get assetTypeModels(): AssetTypeClass[] {
    return this._assetTypeModels;
  }

  set assetTypeModels(value: AssetTypeClass[]) {
    this._assetTypeModels = value;
  }
}
