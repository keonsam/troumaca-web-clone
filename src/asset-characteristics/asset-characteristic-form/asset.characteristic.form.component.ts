import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { AssetCharacteristic } from '../asset.characteristic';
import { AssetCharacteristicService } from '../asset.characteristic.service';
import {UnitOfMeasure} from '../../unit-of-measure/unit.of.measure';
import {debounceTime, filter, map} from 'rxjs/operators';
import {ASSET_CHARACTERISTICS} from '../../app/routes';

@Component({
  selector: 'app-asset-characteristic-form',
  templateUrl: './asset.characteristic.form.component.html',
  styleUrls: ['./asset.characteristic.form.component.css']
})
export class AssetCharacteristicFormComponent implements OnInit {

  name: FormControl;
  defaultValue: FormControl;
  unitOfMeasure: FormControl;
  type: FormControl;
  description: FormControl;

  formula: FormControl;
  calLevel: FormControl;
  maxValue: FormControl;
  minValue: FormControl;

  catValue: FormControl;
  effectiveDate: FormControl;
  untilDate: FormControl;

  assetCharacteristicForm: FormGroup;

  unitOfMeasures: any[];
  types: any[];

  update = false;
  doNotDisplayFailureMessage = true;

  private assetCharacteristic: AssetCharacteristic;
  private assetCharacteristicLink = `/${ASSET_CHARACTERISTICS}`;
  private pageSize = 5;

  constructor(private assetCharacteristicService: AssetCharacteristicService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.assetCharacteristic = new AssetCharacteristic();

    this.name = new FormControl('', Validators.required);
    this.defaultValue = new FormControl('');
    this.unitOfMeasure = new FormControl('');
    this.type = new FormControl('054b50c2-9e8a-4cfb-8bac-54af9ac53613');
    this.description = new FormControl('');
    this.formula = new FormControl('');
    this.calLevel = new FormControl('');
    this.maxValue = new FormControl('');
    this.minValue = new FormControl('');
    this.catValue = new FormControl('');
    this.effectiveDate = new FormControl('');
    this.untilDate = new FormControl('');

    this.assetCharacteristicForm = formBuilder.group({
      'name': this.name,
      'defaultValue': this.defaultValue,
      'unitOfMeasure': this.unitOfMeasure,
      'type': this.type,
      'description': this.description,
      'formula': this.formula,
      'calLevel': this.calLevel,
      'maxValue': this.maxValue,
      'minValue': this.minValue,
      'catValue': this.catValue,
      'effectiveDate': this.effectiveDate,
      'untilDate': this.untilDate
    });

    this.assetCharacteristicForm
      .valueChanges
      .subscribe(value => {
        this.assetCharacteristic.name = value.name;
        this.assetCharacteristic.defaultValue = value.defaultValue;
        this.assetCharacteristic.typeId = value.type;
        this.assetCharacteristic.description = value.description;
        this.assetCharacteristic.formula = value.formula;
        this.assetCharacteristic.calLevel = value.calLevel;
        this.assetCharacteristic.maxValue = value.maxValue;
        this.assetCharacteristic.minValue = value.minValue;
        this.assetCharacteristic.catValue = value.catValue;
        this.assetCharacteristic.effectiveDate = value.effectiveDate;
        this.assetCharacteristic.untilDate = value.untilDate;
      });
  }

  ngOnInit(): void {
    this.createAndPopulateDropDowns();
    if (this.route.snapshot && this.route.snapshot.data['assetCharacteristic']) {
      const assetCharacteristic = this.route.snapshot.data['assetCharacteristic'];
      this.setInputValues(assetCharacteristic);
      this.update = true;
      this.assetCharacteristic = assetCharacteristic;
    }
  }

  private createAndPopulateDropDowns() {
    this.getTypes();
    this.populateUnitOfMeasureDropDown();
  }

  private getTypes() {
    this.assetCharacteristicService.getTypes()
      .subscribe(value => {
        if (value && value.length) {
          this.types = value;
        }
      }, error => {
        console.log(error);
      });
  }

  private populateUnitOfMeasureDropDown() {
    this.findUnitOfMeasures('');
    this.unitOfMeasure.valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findUnitOfMeasures(value);
      });
  }

  private findUnitOfMeasures(value) {
    this.assetCharacteristicService
      .findUnitOfMeasures(value, this.pageSize) // send search request to the backend
      .pipe(map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            unitOfMeasureId: v2.unitOfMeasureId,
            name: v2.name
          };
        })
      }))
      .subscribe(next => { // update the data
        this.unitOfMeasures = next;
      }, error => {
        console.log('findAssets error - ' + error);
      });
  }

  private setInputValues(assetCharacteristic: AssetCharacteristic) {
    this.name.setValue(assetCharacteristic.name);
    this.defaultValue.setValue(assetCharacteristic.defaultValue);
    this.type.setValue(assetCharacteristic.typeId);
    this.unitOfMeasure.setValue(assetCharacteristic.unitOfMeasure ? assetCharacteristic.unitOfMeasure.name : '');
    this.description.setValue(assetCharacteristic.description);
    this.formula.setValue(assetCharacteristic.formula);
    this.maxValue.setValue(assetCharacteristic.maxValue);
    this.minValue.setValue(assetCharacteristic.minValue);
    this.catValue.setValue(assetCharacteristic.catValue);
    this.effectiveDate.setValue(assetCharacteristic.effectiveDate);
    this.untilDate.setValue(assetCharacteristic.untilDate);
  }

  onUnitOfMeasureSelect(unitOfMeasure: UnitOfMeasure) {
    this.assetCharacteristic.unitOfMeasureId = unitOfMeasure.unitOfMeasureId;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.assetCharacteristicService.addAssetCharacteristic(this.assetCharacteristic)
      .subscribe(value => {
        if (value && value.assetCharacteristicId) {
          this.router.navigate([this.assetCharacteristicLink])
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      })
  }

  onUpdate() {
    this.doNotDisplayFailureMessage = true;

    this.assetCharacteristicService.updateAssetCharacteristic(this.assetCharacteristic)
      .subscribe(value => {
        if (value) {
          this.router.navigate([this.assetCharacteristicLink])
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      })
  }

  cancel() {
    this.router.navigate([this.assetCharacteristicLink]);
  }
}
