import {Component, OnInit} from '@angular/core';
import {AssetTypeService} from './asset.type.service';

@Component({
  selector: 'asset-types',
  templateUrl: './asset.type.component.html',
  styleUrls: ['./asset.type.component.css']
})
export class AssetTypeComponent implements OnInit {


  constructor(private assetTypeService: AssetTypeService) {
  }

  ngOnInit(): void {
   /*  this.assetTypeService
      .getAssetTypes(pageNumber:number, pageSize:number, sortOrder:string)
      .subscribe(assetTypes => {
        console.log(assetTypes);
        this._assetTypes = assetTypes;
      }, error => {

      }, () => {

      }); */
  }

}
