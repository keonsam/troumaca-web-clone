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

  specificationName: FormControl;
  specificationType: FormControl;
  partOf: FormControl;
  modelNumber: FormControl;
  standardPrice: FormControl;
  effectiveDate: FormControl;
  description1: FormControl;
  assetSpecificationForm: FormGroup;

  brandName: FormControl;
  abbreviation: FormControl;
  description2: FormControl;
  assetBrandForm: FormGroup;

  characteristicsName: FormControl;
  value: FormControl;
  optional: FormControl;
  effectiveDate1: FormControl;
  untilDate: FormControl;
  assetCharacteristicsForm: FormGroup;

  private asset: Asset;
  assets: Asset[];
  discreteTypes: string[];
  inventoryTypes: string[];
  specificationTypes: string[];

  pageSize = 5;
  assetExist = false;

  doNotDisplayFailureMessage: boolean;

  constructor(private assetService: AssetService,
              // private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.search = new FormControl('');

    this.name = new FormControl('', [Validators.required]);
    this.createdOn = new FormControl(new Date(), [Validators.required]);
    this.destroyOn = new FormControl('', [Validators.required]);
    this.expireOn = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.discreteType = new FormControl('', [Validators.required]);
    this.serialNumber = new FormControl('', [Validators.required]);
    this.inventoryType = new FormControl('', [Validators.required]);
    this.inventoryID = new FormControl('', [Validators.required]);
    this.quantity = new FormControl('', [Validators.required]);
    this.buildingNumber = new FormControl('', [Validators.required]);
    this.lotNumber = new FormControl('', [Validators.required]);
    this.numberOfShares = new FormControl('', [Validators.required]);

    this.specificationName = new FormControl('', [Validators.required]);
    this.specificationType = new FormControl('', [Validators.required]);
    this.partOf = new FormControl('', [Validators.required]);
    this.modelNumber = new FormControl('', [Validators.required]);
    this.standardPrice = new FormControl('', [Validators.required]);
    this.effectiveDate = new FormControl(new Date(), [Validators.required]);
    this.description1 = new FormControl('', [Validators.required]);

    this.brandName = new FormControl('', [Validators.required]);
    this.abbreviation = new FormControl('', [Validators.required]);
    this.description2 = new FormControl('', [Validators.required]);

    this.characteristicsName = new FormControl('', [Validators.required]);
    this.value = new FormControl('', [Validators.required]);
    this.optional = new FormControl('', [Validators.required]);
    this.effectiveDate1 = new FormControl(new Date(), [Validators.required]);
    this.untilDate = new FormControl('', [Validators.required]);


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

    this.assetSpecificationForm = formBuilder.group({
      'specificationName': this.specificationName,
      'specificationType': this.specificationType,
      'partOf': this.partOf,
      'modelNumber': this.modelNumber,
      'standardPrice': this.standardPrice,
      'effectiveDate': this.effectiveDate,
      'description1': this.description1
    });

    this.assetBrandForm = formBuilder.group({
      'brandName': this.brandName,
      'abbreviation': this.abbreviation,
      'description2': this.description2
    });

    this.assetCharacteristicsForm = formBuilder.group({
      'characteristicsName': this.characteristicsName,
      'value': this.value,
      'optional': this.optional,
      'effectiveDate1': this.effectiveDate1,
      'untilDate': this.untilDate
    });

    this.asset = new Asset();

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

    this.assetSpecificationForm
      .valueChanges
      .subscribe( value => {
        this.asset.specification.name = value.specificationName;
        this.asset.specification.type = value.specificationType;
        this.asset.specification.partOf = value.partOf;
        this.asset.specification.modelNumber = value.modelNumber;
        this.asset.specification.standardPrice = value.standardPrice;
        this.asset.specification.effectiveDate = value.effectiveDate;
        this.asset.specification.description = value.description1;
      });

    this.assetBrandForm
      .valueChanges
      .subscribe( value => {
        this.asset.brand.name = value.brandName;
        this.asset.brand.abbreviation = value.abbreviation;
        this.asset.brand.description = value.description2;
      });

    this.assetCharacteristicsForm
      .valueChanges
      .subscribe( value => {
        this.asset.characteristics.name = value.characteristicsName;
        this.asset.characteristics.value = value.value;
        this.asset.characteristics.optional = value.optional;
        this.asset.characteristics.effectiveOn = value.effectiveDate1;
        this.asset.characteristics.until = value.untilDate;
      });

    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    this.createAndPopulateDropDowns();
    if (this.route.snapshot && this.route.snapshot.data['asset']) {
      this.setInputValues(this.route.snapshot.data['asset']);
      this.assetExist = true;
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

    this.specificationName.setValue(asset.specification.name);
    this.specificationType.setValue(asset.specification.type);
    this.partOf.setValue(asset.specification.partOf);
    this.modelNumber.setValue(asset.specification.modelNumber);
    this.standardPrice.setValue(asset.specification.standardPrice);
    this.effectiveDate.setValue(asset.specification.effectiveDate);
    this.description1.setValue(asset.specification.description);

    this.brandName.setValue(asset.brand.name);
    this.abbreviation.setValue(asset.brand.abbreviation);
    this.description2.setValue(asset.brand.description);

    this.characteristicsName.setValue(asset.characteristics.name);
    this.value.setValue(asset.characteristics.value);
    this.optional.setValue(asset.characteristics.optional);
    this.effectiveDate1.setValue(asset.characteristics.effectiveOn);
    this.untilDate.setValue(asset.characteristics.until);
    this.asset = asset;
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
          this.router.navigate(['/assets']);
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
    this.router.navigate(['/assets']);
  }

}
