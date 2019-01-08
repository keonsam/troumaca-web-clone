import {Component, OnInit} from '@angular/core';
import {AssetService} from '../asset.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Asset} from '../asset';
import {Router, ActivatedRoute} from '@angular/router';
import { filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset.form.component.html',
  styleUrls: ['./asset.form.component.css']
})

export class AssetFormComponent implements OnInit {

  search: FormControl;

  name: FormControl;
  createdOn: FormControl;
  destroyOn: FormControl;
  expireOn: FormControl;
  description: FormControl;

  discreteType: FormControl;
  serialNumber: FormControl;

  inventoryType: FormControl;
  inventoryID: FormControl;
  quantity: FormControl;

  buildingNumber: FormControl;

  lotNumber: FormControl;
  numberOfShares: FormControl;

  assetForm: FormGroup;

  assets: Asset[];
  discreteTypes: string[];
  inventoryTypes: string[];

  pageSize = 5;
  assetExist = false;
  doNotDisplayFailureMessage = true;

  private asset: Asset;
  private oldAsset: Asset;

  constructor(private assetService: AssetService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.search = new FormControl('');

    this.name = new FormControl('', [Validators.required]);
    this.createdOn = new FormControl(new Date(), [Validators.required]);
    this.destroyOn = new FormControl('', [Validators.required]);
    this.expireOn = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);

    this.discreteType = new FormControl('');
    this.serialNumber = new FormControl('');

    this.inventoryType = new FormControl('');
    this.inventoryID = new FormControl('');
    this.quantity = new FormControl('');

    this.buildingNumber = new FormControl('');

    this.lotNumber = new FormControl('');
    this.numberOfShares = new FormControl('');


    this.assetForm = formBuilder.group({
      'name': this.name,
      'createdOn': this.createdOn,
      'destroyOn': this.destroyOn,
      'expireOn': this.expireOn,
      'description': this.description,
      'discreteType': this.discreteType,
      'serialNumber': this.serialNumber,
      'inventoryType': this.inventoryType,
      'inventoryID': this.inventoryID,
      'quantity': this.quantity,
      'buildingNumber': this.buildingNumber,
      'lotNumber': this.lotNumber,
      'numberOfShares': this.numberOfShares
    });

    this.asset = new Asset();
    this.oldAsset = new Asset();

    this.assetForm
      .valueChanges
      .subscribe(value => {
        this.asset.name = value.name;
        this.asset.createdOn = value.createdOn;
        this.asset.destroyOn = value.destroyOn;
        this.asset.expireOn = value.expireOn;
        this.asset.description = value.description;

        this.asset.discreteItem.type = value.discreteType;
        this.asset.discreteItem.serialNumber = value.serialNumber;

        this.asset.inventoryItem.type = value.inventoryType;
        this.asset.inventoryItem.inventoryID = value.inventoryID;
        this.asset.inventoryItem.quantity = value.quantity;

        this.asset.building.buildingNumber = value.buildingNumber;

        this.asset.lot.lotNumber = value.lotNumber;
        this.asset.lot.numberOfShares = value.numberOfShares;
      }, error2 => {
        console.log(error2);
      });
  }

  ngOnInit(): void {
    this.createAndPopulateDropDowns();
    if (this.route.snapshot && this.route.snapshot.data['asset']) {
      const asset = this.route.snapshot.data['asset'];
      this.setInputValues(asset);
      this.assetExist = true;
      this.asset = asset;
    }
  }

  private createAndPopulateDropDowns() {
    this.populateAssetsDropDown();
  }

  private populateAssetsDropDown() {
    this.findAssets('');
    this.search.valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findAssets(value);
      });
  }

  private findAssets(value) {
    this.assetService
      .findAssets(value, this.pageSize) // send search request to the backend
      // .pipe(map(value2 => { // convert results to dropdown data
      //   return value2.map(v2 => {
      //     return {
      //       assetTypeId: v2.assetTypeId,
      //       name: v2.name
      //     };
      //   })
      // }))
      .subscribe(next => { // update the data
        this.assets = next;
      }, error => {
        console.log('findAssets error - ' + error);
      });
  }


  private setInputValues(asset: Asset) {
    this.name.setValue(asset.name);
    this.createdOn.setValue(asset.createdOn);
    this.destroyOn.setValue(asset.destroyOn);
    this.expireOn.setValue(asset.expireOn);
    this.description.setValue(asset.description);
    this.discreteType.setValue(asset.discreteItem.type);
    this.serialNumber.setValue(asset.discreteItem.serialNumber);
    this.inventoryType.setValue(asset.inventoryItem.type);
    this.inventoryID.setValue(asset.inventoryItem.inventoryID);
    this.quantity.setValue(asset.inventoryItem.quantity);
    this.buildingNumber.setValue(asset.building.buildingNumber);
    this.lotNumber.setValue(asset.lot.lotNumber);
    this.numberOfShares.setValue(asset.lot.numberOfShares);
  }

  private getAsset(assetId: string) {
    this.assetService.getAssetById(assetId)
      .subscribe(asset => {
        if (asset && asset.assetId) {
          this.asset = asset;
          this.setInputValues(asset);
        }
      });
  }

  onSearchSelect(asset: Asset) {
    delete asset['_id'];
    delete asset['assetId'];
    this.setInputValues(asset);
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.assetService.addAsset(this.asset)
      .subscribe(value => {
        if (value && value.assetId) {
          this.assetService.assetSpecificationState.next(value.assetId);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
      });
  }

  onUpdate() {
    this.doNotDisplayFailureMessage = true;
    this.assetService
      .updateAsset(this.asset.assetId, this.asset)
      .subscribe(value => {
        if (value) {
          this.router.navigate(['/assets']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    if (this.assetExist) {
      this.getAsset(this.asset.assetId)
    }else {
      this.asset = new Asset();
      this.setInputValues(new Asset());
    }
  }

}
