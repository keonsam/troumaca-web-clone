import {Component, OnInit} from "@angular/core";
import {Asset} from "./asset";
import {AssetService} from "./asset.service";

@Component({
  selector: 'assets',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {

  // private _headerNames:string[] = [];
  // private _dataValues:AssetModel[] = [];


  constructor(private assetService:AssetService) {
  }

  ngOnInit(): void {

    // this.headerNames = [
    //   "Classification",
    //   "Name",
    //   "Description"
    // ];

    // this.dataValues = [];

  }

  // get headerNames(): string[] {
  //   return this._headerNames;
  // }

  // set headerNames(value: string[]) {
  //   this._headerNames = value;
  // }

  // get dataValues(): AssetModel[] {
  //   return this._dataValues;
  // }

  // set dataValues(value: AssetModel[]) {
  //   this._dataValues = value;
  // }

}