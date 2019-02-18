import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {AssetTypeService} from '../asset.type.service';
import {AssetType} from '../asset.type';
import {ActivatedRoute, Router} from '@angular/router';
import {map, filter, debounceTime } from 'rxjs/operators';
import {AssetSpecification} from '../../assets/asset-specification/asset.specification';
import {AssignedCharacteristic} from '../../asset-characteristics/assigned.characteristic';
import {AssetName} from '../../asset-name-types/asset.name';
import {AssetIdentifier} from '../../asset-identifier-types/asset.identifier';
import {AssetRole} from '../../asset-role-types/asset.role';
import { ASSET_TYPE } from '../../app/routes';

@Component({
  selector: 'app-asset-type-form',
  templateUrl: './asset.type.form.component.html',
  styleUrls: ['./asset.type.form.component.css']
})
export class AssetTypeFormComponent implements OnInit {

  instanceOf: FormControl;
  parent: FormControl;
  name: FormControl;
  description: FormControl;

  brand: FormControl;
  modelNumber: FormControl;
  standardPrice: FormControl;
  effectiveDate: FormControl;
  totalSV: FormControl;

  assetTypeForm: FormGroup;

  assetType: AssetType;
  instances: any[];
  assetTypes: any[];

  doNotDisplayFailureMessage: boolean;
  update: boolean;
  assignedChars: AssignedCharacteristic[];
  assetNames: AssetName[];
  assetIdentifiers: AssetIdentifier[];
  assetRoles: AssetRole[];

  private pageSize = 5;
  private assetTypeLink = `/${ASSET_TYPE}`;

  constructor(private assetTypeService: AssetTypeService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    const assetType = new AssetType();
    assetType.specification = new AssetSpecification();
    this.assetType = assetType;

    this.instanceOf = new FormControl('7bc3fa8a-84b6-4088-91d4-8a1cc84e7cff', Validators.required);
    this.parent = new FormControl('', Validators.required);
    this.name = new FormControl('', Validators.required);
    this.description = new FormControl('');

    this.brand = new FormControl('');
    this.modelNumber = new FormControl('');
    this.standardPrice = new FormControl('');
    this.effectiveDate = new FormControl('');
    this.totalSV = new FormControl('');

    this.assetTypeForm = formBuilder.group({
      'name': this.name,
      'description': this.description,
      'instanceOf': this.instanceOf,
      'parent': this.parent,
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

    this.assetTypeForm
      .valueChanges
      .subscribe(value => {
        this.assetType.instanceId = value.instanceOf;
        this.assetType.name = value.name;
        this.assetType.description = value.description;
        this.assetType.specification.modelNumber = value.modelNumber;
        this.assetType.specification.standardPrice = value.standardPrice;
        this.assetType.specification.effectiveDate = value.effectiveDate;
        this.assetType.specification.totalSV = value.totalSV;
        this.assetType.assignedCharacteristics = value.characteristics;
        this.assetType.assetNames = value.names;
        this.assetType.identifiers = value.identifiers;
        this.assetType.roles = value.roles;
      }, error2 => {
        console.log(error2);
      });

    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    this.createAndPopulateDropDowns();
    if (this.route.snapshot && this.route.snapshot.data['assetType']) {
      this.setInputValues(this.route.snapshot.data['assetType']);
      this.update = true;
    }
  }

  private createAndPopulateDropDowns() {
    this.populateInstanceOfDropDown();
    this.populateSubTypeOfDropDown();
  }

  private populateInstanceOfDropDown() {
    this.findInstances('');
    this.instanceOf.valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findInstances(value);
      });
  }

  private findInstances(value: string) {
    this.assetTypeService
      .findInstances(value, this.pageSize) // send search request to the backend
      .pipe(map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            instanceId: v2.instanceId,
            name: v2.name
          };
        })
      }))
      .subscribe(next => { // update the data
        this.instances = next;
      }, error => {
        console.log('findAssets error - ' + error);
      });
  }

  private populateSubTypeOfDropDown() {
    this.findAssetTypes('');
    this.parent.valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findAssetTypes(value);
      });
  }

  private findAssetTypes(value: string) {
    this.assetTypeService
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

  private setInputValues(assetType?: AssetType) {
    this.instanceOf.setValue(assetType.instanceId);
    this.parent.setValue(assetType.parentName);
    this.name.setValue(assetType.name);
    this.description.setValue(assetType.description);
    if (assetType.specification) {
      this.brand.setValue(assetType.specification.brand ? assetType.specification.brand.name : '' );
      this.modelNumber.setValue(assetType.specification.modelNumber);
      this.standardPrice.setValue(assetType.specification.standardPrice);
      this.effectiveDate.setValue(assetType.specification.effectiveDate);
      this.totalSV.setValue(assetType.specification.totalSV);
    }
    if (assetType.assignedCharacteristics && assetType.assignedCharacteristics.length > 0) {
      this.assignedChars = assetType.assignedCharacteristics;
    }
    if (assetType.assetNames && assetType.assetNames.length > 0) {
      this.assetNames = assetType.assetNames;
    }
    if (assetType.identifiers && assetType.identifiers.length > 0) {
      this.assetIdentifiers = assetType.identifiers;
    }
    if (assetType.roles && assetType.roles.length > 0) {
      this.assetRoles = assetType.roles;
    }
    this.assetType = assetType;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.assetTypeService
    .addAssetType(this.assetType)
    .subscribe(value => {
      if (value && value.assetTypeId) {
        this.router.navigate([this.assetTypeLink]);
      } else {
        this.doNotDisplayFailureMessage = false;
      }
    }, error => {
      console.log(error);
      this.doNotDisplayFailureMessage = false;
    });
  }

  onUpdate() {
    this.doNotDisplayFailureMessage = true;

    this.assetTypeService
      .updateAssetType(this.assetType.assetTypeId, this.assetType)
      .subscribe(value => {
        if (value) {
          this.router.navigate([this.assetTypeLink]);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    this.router.navigate([this.assetTypeLink]);
  }

  onAssetTypeSelect(assetType: AssetType) {
    if (!assetType.initialId) {
      this.assetType.initialId = assetType.assetTypeId;
    }else {
      this.assetType.parentId = assetType.assetTypeId;
      this.assetType.initialId = assetType.initialId;
    }
  }

  onBrandSelect(brandId: string) {
    this.assetType.specification.brandId = brandId;
  }
}
