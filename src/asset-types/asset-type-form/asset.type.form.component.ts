import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {AssetTypeService} from '../asset.type.service';
import {AssetType} from '../asset.type';
import {ActivatedRoute, Router} from '@angular/router';
import {map, filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-asset-type-form',
  templateUrl: './asset.type.form.component.html',
  styleUrls: ['./asset.type.form.component.css']
})
export class AssetTypeFormComponent implements OnInit {


  name: FormControl;
  description: FormControl;
  instanceOf: FormControl;
  subTypeOf: FormControl;

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

  private pageSize = 5;

  constructor(private assetTypeService: AssetTypeService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.name = new FormControl('', Validators.required);
    this.description = new FormControl('');
    this.instanceOf = new FormControl('', Validators.required);
    this.subTypeOf = new FormControl('', Validators.required);

    this.modelNumber = new FormControl('');
    this.standardPrice = new FormControl('');
    this.effectiveDate = new FormControl('');
    this.totalSV = new FormControl('');

    this.assetTypeForm = formBuilder.group({
      'name': this.name,
      'description': this.description,
      'instanceOf': this.instanceOf,
      'subTypeOf': this.subTypeOf,
      'modelNumber': this.modelNumber,
      'standardPrice': this.standardPrice,
      'effectiveDate': this.effectiveDate,
      'totalSV': this.totalSV
    });

    this.assetType = new AssetType();

    this.assetTypeForm
      .valueChanges
      .subscribe(value => {
        this.assetType.name = value.name;
        this.assetType.description = value.description;
        this.assetType.instanceOf = value.instanceOf;
        this.assetType.modelNumber = value.modelNumber;
        this.assetType.standardPrice = value.standardPrice;
        this.assetType.effectiveDate = value.effectiveDate;
        this.assetType.totalSV = value.totalSV;
      }, error2 => {
        console.log(error2);
      });

    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    this.createAndPopulateDropDowns();
    if (this.route.snapshot && this.route.snapshot.data['assetType']) {
      this.setInputValues(this.route.snapshot.data['assetType']);
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
      .findInstancesOf(value, this.pageSize) // send search request to the backend
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
    this.findSubTypes('');
    this.subTypeOf.valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findSubTypes(value);
      });
  }

  private findSubTypes(value: string) {
    this.assetTypeService
      .findSubTypes(value, this.pageSize) // send search request to the backend
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
    // this.assetTypeClassId.setValue(assetType.assetTypeClass ? assetType.assetTypeClass.name : '');
    // this.name.setValue(assetType.name);
    // this.description.setValue(assetType.description);
    // this.modelNumber.setValue(assetType.modelNumber);
    // this.materialCode.setValue(assetType.materialCode);
    // this.assetType = assetType;
    // this.values = assetType.values;
    // this.unitOfMeasureId = assetType.unitOfMeasure ? assetType.unitOfMeasure.name : '';
    // this.assetTypeExist = true;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.assetTypeService
    .addAssetType(this.assetType)
    .subscribe(value => {
      if (value && value.assetTypeId) {
        this.router.navigate(['/asset-types']);
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
          this.router.navigate(['/asset-types']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    this.router.navigate(['/asset-types']);
  }

}
