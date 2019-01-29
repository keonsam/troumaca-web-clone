import {Component, OnInit} from '@angular/core';
import {AssetService} from '../asset.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Asset} from '../asset';
import {Router, ActivatedRoute} from '@angular/router';
import {filter, debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset.form.component.html',
  styleUrls: ['./asset.form.component.css']
})

export class AssetFormComponent implements OnInit {

  assetType: FormControl;

  name: FormControl;
  createdOn: FormControl;
  destroyOn: FormControl;
  description: FormControl;

  modelNumber: FormControl;
  standardPrice: FormControl;
  effectiveDate: FormControl;
  totalSV: FormControl;

  serialNumber: FormControl;
  inventoryID: FormControl;
  quantity: FormControl;
  buildingNumber: FormControl;
  lotNumber: FormControl;
  numberOfShares: FormControl;

  assetForm: FormGroup;

  assetTypes: any[];
  assetTypeSelected: string;

  brand: FormControl;
  brands: any[];

  pageSize = 5;
  update = false;
  doNotDisplayFailureMessage = true;

  private asset: Asset;
  private oldAsset: Asset;

  constructor(private assetService: AssetService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.assetType = new FormControl('', [Validators.required]);

    this.brand = new FormControl('');

    this.name = new FormControl('', [Validators.required]);
    this.createdOn = new FormControl(new Date(), [Validators.required]);
    this.destroyOn = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);

    this.serialNumber = new FormControl('');
    this.inventoryID = new FormControl('');
    this.quantity = new FormControl('');
    this.buildingNumber = new FormControl('');
    this.lotNumber = new FormControl('');
    this.numberOfShares = new FormControl('');

    this.modelNumber = new FormControl('');
    this.standardPrice = new FormControl('');
    this.effectiveDate = new FormControl('');
    this.totalSV = new FormControl('');

    this.assetForm = formBuilder.group({
      'name': this.name,
      'createdOn': this.createdOn,
      'destroyOn': this.destroyOn,
      'description': this.description,
      'serialNumber': this.serialNumber,
      'inventoryID': this.inventoryID,
      'quantity': this.quantity,
      'buildingNumber': this.buildingNumber,
      'lotNumber': this.lotNumber,
      'numberOfShares': this.numberOfShares,
      'brand': this.brand,
      'modelNumber': this.modelNumber,
      'standardPrice': this.standardPrice,
      'effectiveDate': this.effectiveDate,
      'totalSV': this.totalSV
    });

    this.asset = new Asset();

    this.assetForm
      .valueChanges
      .subscribe(value => {
        this.asset.name = value.name;
        this.asset.createdOn = value.createdOn;
        this.asset.destroyOn = value.destroyOn;
        this.asset.description = value.description;

        this.asset.discreteItem.serialNumber = value.serialNumber;
        this.asset.inventoryItem.inventoryID = value.inventoryID;
        this.asset.inventoryItem.quantity = value.quantity;
        this.asset.building.buildingNumber = value.buildingNumber;
        this.asset.lot.lotNumber = value.lotNumber;
        this.asset.lot.numberOfShares = value.numberOfShares;

        this.asset.specification.modelNumber = value.modelNumber;
        this.asset.specification.standardPrice = value.standardPrice;
        this.asset.specification.effectiveDate = value.effectiveDate;
        this.asset.specification.totalSV = value.totalSV;
      }, error2 => {
        console.log(error2);
      });
  }

  ngOnInit(): void {
    this.createAndPopulateDropDowns();
    if (this.route.snapshot && this.route.snapshot.data['asset']) {
      const asset = this.route.snapshot.data['asset'];
      this.setInputValues(asset);
      this.update = true;
      this.asset = asset;
    }
  }

  private createAndPopulateDropDowns() {
    this.populateAssetTypesDropDown();
  }

  private populateAssetTypesDropDown() {
    this.findAssetTypes('');
    this.assetType.valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findAssetTypes(value);
      });
  }

  private findAssetTypes(value) {
    this.assetService
      .findAssetTypes(value, this.pageSize) // send search request to the backend
      .pipe(map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            assetTypeId: v2.assetTypeId,
            name: v2.name
          };
        })
      }))
      .subscribe(next => { // update the data
        this.assetTypes = next;
      }, error => {
        console.log('findAssets error - ' + error);
      });
  }

  private setInputValues(asset: Asset) {
    this.name.setValue(asset.name);
    this.createdOn.setValue(asset.createdOn);
    this.destroyOn.setValue(asset.destroyOn);
    // this.expireOn.setValue(asset.expireOn);
    this.description.setValue(asset.description);
    // this.discreteType.setValue(asset.discreteItem.type);
    this.serialNumber.setValue(asset.discreteItem.serialNumber);
    // this.inventoryType.setValue(asset.inventoryItem.type);
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

  onAssetTypeSelect(assetType: any) {
    this.assetTypeSelected = assetType.name;
  }

  onBrandSelect(brandId: string) {

  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.assetService.addAsset(this.asset)
      .subscribe(value => {
        if (value && value.assetId) {
          this.router.navigate(['/assets'])
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
          this.router.navigate(['/assets'])
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    if (this.update) {
      this.getAsset(this.asset.assetId)
    }else {
      this.asset = new Asset();
      this.setInputValues(new Asset());
    }
  }

  openAssetTypeDialog() {

  }

}
