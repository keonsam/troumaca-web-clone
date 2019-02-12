import {Component, OnInit} from '@angular/core';
import {AssetService} from '../asset.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Asset} from '../asset';
import {Router, ActivatedRoute} from '@angular/router';
import {filter, debounceTime } from 'rxjs/operators';
import {AssetType} from '../../asset-types/asset.type';
import {AssignedCharacteristic} from '../../asset-characteristics/assigned.characteristic';
import {AssetName} from '../../asset-name-types/asset.name';
import {AssetIdentifier} from '../../asset-identifier-types/asset.identifier';
import {AssetRole} from '../../asset-role-types/asset.role';
import {ASSET} from '../../app/routes';

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

  serialNumber: FormControl;
  inventoryID: FormControl;
  quantity: FormControl;
  buildingNumber: FormControl;
  lotNumber: FormControl;
  numberOfShares: FormControl;

  modelNumber: FormControl;
  standardPrice: FormControl;
  effectiveDate: FormControl;
  totalSV: FormControl;

  assetForm: FormGroup;

  assetTypes: AssetType[];
  assetTypeSelected: string;

  brand: FormControl;
  brands: any[];

  pageSize = 5;
  update = false;
  doNotDisplayFailureMessage = true;

  assignedChars: AssignedCharacteristic[];
  assetNames: AssetName[];
  assetIdentifiers: AssetIdentifier[];
  assetRoles: AssetRole[];

  private asset: Asset;

  constructor(private assetService: AssetService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.asset = new Asset();


    this.assetType = new FormControl('', [Validators.required]);

    this.brand = new FormControl('');

    this.name = new FormControl('', [Validators.required]);
    this.createdOn = new FormControl('', [Validators.required]);
    this.destroyOn = new FormControl('', [Validators.required]);
    this.description = new FormControl('');

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
      'totalSV': this.totalSV,
      'characteristics': formBuilder.array([]),
      'names': formBuilder.array([]),
      'identifiers': formBuilder.array([]),
      'roles': formBuilder.array([])
    });


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

        this.asset.assignedCharacteristics = value.characteristics;
        this.asset.assetNames = value.names;
        this.asset.identifiers = value.identifiers;
        this.asset.roles = value.roles;
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
      .subscribe(next => { // update the data
        this.assetTypes = next;
      }, error => {
        console.log('findAssets error - ' + error);
      });
  }

  private setInputValues(asset: Asset) {
    this.name.setValue(asset.name);
    this.assetType.setValue(asset.assetType ? asset.assetType.name : '');
    this.assetTypeSelected = asset.assetType ? asset.assetType.initialId ? asset.assetType.initialId : asset.assetType.assetTypeId : '';
    this.createdOn.setValue(asset.createdOn);
    this.destroyOn.setValue(asset.destroyOn);
    this.description.setValue(asset.description);
    this.serialNumber.setValue(asset.discreteItem.serialNumber);
    this.inventoryID.setValue(asset.inventoryItem.inventoryID);
    this.quantity.setValue(asset.inventoryItem.quantity);
    this.buildingNumber.setValue(asset.building.buildingNumber);
    this.lotNumber.setValue(asset.lot.lotNumber);
    this.numberOfShares.setValue(asset.lot.numberOfShares);
    if (asset.specification) {
      this.brand.setValue(asset.specification.brand ? asset.specification.brand.name : '' );
      this.modelNumber.setValue(asset.specification.modelNumber);
      this.standardPrice.setValue(asset.specification.standardPrice);
      this.effectiveDate.setValue(asset.specification.effectiveDate);
      this.totalSV.setValue(asset.specification.totalSV);
    }
    if (asset.assignedCharacteristics && asset.assignedCharacteristics.length > 0) {
      this.assignedChars = asset.assignedCharacteristics;
    }
    if (asset.assetNames && asset.assetNames.length > 0) {
      this.assetNames = asset.assetNames;
    }
    if (asset.identifiers && asset.identifiers.length > 0) {
      this.assetIdentifiers = asset.identifiers;
    }
    if (asset.roles && asset.roles.length > 0) {
      this.assetRoles = asset.roles;
    }
  }

  onAssetTypeSelect(assetType: AssetType) {
    this.asset.assetTypeId = assetType.assetTypeId;
    if (!assetType.initialId) {
      this.assetTypeSelected = assetType.assetTypeId;
    } else {
      this.assetTypeSelected = assetType.initialId;
    }
    if (assetType.specification && !this.update) {
      this.brand.setValue(assetType.specification.brand ? assetType.specification.brand.name : '' );
      this.modelNumber.setValue(assetType.specification.modelNumber);
      this.standardPrice.setValue(assetType.specification.standardPrice);
      this.effectiveDate.setValue(assetType.specification.effectiveDate);
      this.totalSV.setValue(assetType.specification.totalSV);
    }
    if (assetType.assignedCharacteristics && assetType.assignedCharacteristics.length > 0 && !this.update) {
      this.assignedChars = assetType.assignedCharacteristics;
    }
    if (assetType.assetNames && assetType.assetNames.length > 0 && !this.update) {
      this.assetNames = assetType.assetNames;
    }
    if (assetType.identifiers && assetType.identifiers.length > 0 && !this.update) {
      this.assetIdentifiers = assetType.identifiers;
    }
    if (assetType.roles && assetType.roles.length > 0 && !this.update) {
      this.assetRoles = assetType.roles;
    }
  }

  onBrandSelect(brandId: string) {
    this.asset.specification.brandId = brandId;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.assetService.addAsset(this.asset)
      .subscribe(value => {
        if (value && value.assetId) {
          this.router.navigate([ASSET])
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
          this.router.navigate([ASSET])
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    this.router.navigate([ASSET]);
  }

}
