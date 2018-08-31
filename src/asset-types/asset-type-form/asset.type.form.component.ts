import {Component, OnInit} from '@angular/core';
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {AssetTypeService} from '../asset.type.service';
import {AssetType} from '../asset.type';
import {Value} from '../value';
import {AssignedAttribute} from '../../asset-type-classes/assigned.attribute';
import {ActivatedRoute, Router} from '@angular/router';
import {map, filter, debounceTime } from "rxjs/operators";
import {AssetTypeResponse} from "../asset.type.response";

@Component({
  selector: 'app-asset-type-form',
  templateUrl: './asset.type.form.component.html',
  styleUrls: ['./asset.type.form.component.css']
})
export class AssetTypeFormComponent implements OnInit {

  private _assetTypeClassId: FormControl;
  private _name: FormControl;
  private _description: FormControl;
  private _modelNumber: FormControl;
  private _materielCode: FormControl;
  private _valuesForm: FormGroup;
  public unitOfMeasureId: string;
  public assetTypeExist = false;

  private _assetTypeClassIdDataService: CompleterData;

  private _assetTypeForm: FormGroup;

  private assetType: AssetType;
  private values: Value[];

  private _assignedAttributes: AssignedAttribute[];

  private pageSize = 15;
  private _doNotDisplayFailureMessage: boolean;
  private _doNotDisplayFailureMessage2: boolean;

  constructor(private assetTypeService: AssetTypeService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

      this.assetTypeClassId = new FormControl('', Validators.required);
      this.name = new FormControl('', Validators.required);
      this.description = new FormControl('');
      this.modelNumber = new FormControl('');
      this.materialCode = new FormControl('');

      this.assetTypeForm = formBuilder.group({
        'assetTypeClassId': this.assetTypeClassId,
        'name': this.name,
        'description': this.description,
        'modelNumber': this.modelNumber,
        'materialCode': this.materialCode,
      });

    this.assetType = new AssetType();
    this.values = [];

    this.assignedAttributes = [];

    this.assetTypeForm
    .valueChanges
    .subscribe(value => {
      this.assetType.name = value.name;
      this.assetType.description = value.description;
      this.assetType.modelNumber = value.modelNumber;
      this.assetType.materialCode = value.materialCode;
    }, error2 => {
      console.log(error2);
    });

    this.valuesForm = new FormGroup({});

    this.doNotDisplayFailureMessage = true;
    this.doNotDisplayFailureMessage2 = true;

  }

  ngOnInit(): void {
   this.populateAssetTypeClassIdDropDown();
    if (this.route.snapshot && this.route.snapshot.data['assetType']) {
      this.setInputValues(this.route.snapshot.data['assetType']);
    }
  }

  setInputValues(assetTypeResponse?: AssetTypeResponse) {
    this.assetTypeClassId.setValue(assetTypeResponse.assetType.assetTypeClassName);
    this.name.setValue(assetTypeResponse.assetType.name);
    this.description.setValue(assetTypeResponse.assetType.description);
    this.modelNumber.setValue(assetTypeResponse.assetType.modelNumber);
    this.materialCode.setValue(assetTypeResponse.assetType.materialCode);
    this.assetType = assetTypeResponse.assetType;
    this.values = assetTypeResponse.values;
    this.unitOfMeasureId = assetTypeResponse.assetType.unitOfMeasureName;
    this.assetTypeExist = true;

    this.getAttributes();

    this.assetTypeForm.get('assetTypeClassId').valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findAssetTypeClassId(value);
      });
  }

  private populateAssetTypeClassIdDropDown() {
    this.findAssetTypeClassId('');
  }

  findAssetTypeClassId(value) {
    this.assetTypeService
      .findAssetTypeClassId(value, this.pageSize) // send search request to the backend
      .pipe(map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            assetTypeClassId: v2.assetTypeClassId,
            name: v2.name,
          };
        })
      }))
      .subscribe(next => { // update the data
        this.assetTypeClassIdDataService = this.completerService.local(next, 'name', 'name');
      }, error => {
        console.log('findAssetTypeClassId error - ' + error);
      });
  }

  get assetTypeClassId(): FormControl {
    return this._assetTypeClassId;
  }

  set assetTypeClassId(value: FormControl) {
    this._assetTypeClassId = value;
  }

  get name(): FormControl {
    return this._name;
  }

  set name(value: FormControl) {
    this._name = value;
  }

  get description(): FormControl {
    return this._description;
  }

  set description(value: FormControl) {
    this._description = value;
  }

  get modelNumber(): FormControl {
    return this._modelNumber;
  }

  set modelNumber(value: FormControl) {
    this._modelNumber = value;
  }

  get materialCode(): FormControl {
    return this._materielCode;
  }

  set materialCode(value: FormControl) {
    this._materielCode = value;
  }

  get assetTypeClassIdDataService(): CompleterData {
    return this._assetTypeClassIdDataService;
  }

  set assetTypeClassIdDataService(value: CompleterData) {
    this._assetTypeClassIdDataService = value;
  }

  get assetTypeForm(): FormGroup {
    return this._assetTypeForm;
  }

  set assetTypeForm(value: FormGroup) {
    this._assetTypeForm = value;
  }

  get assignedAttributes(): AssignedAttribute[] {
    return this._assignedAttributes;
  }

  set assignedAttributes(value: AssignedAttribute[]) {
    this._assignedAttributes = value;
  }

  get valuesForm(): FormGroup {
    return this._valuesForm;
  }

  set valuesForm(value: FormGroup) {
    this._valuesForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  get doNotDisplayFailureMessage2(): boolean {
    return this._doNotDisplayFailureMessage2;
  }

  set doNotDisplayFailureMessage2(value: boolean) {
    this._doNotDisplayFailureMessage2 = value;
  }

  onAssetTypeClassIdSelect(selected: CompleterItem) {
    if (selected) {
      this.assetType.assetTypeClassId = selected.originalObject.assetTypeClassId;
    }
    this.getAttributes();
  }

  setUnitOfMeasureId(unitOfMeasureId: string) {
    this.assetType.unitOfMeasureId = unitOfMeasureId;
  }

  onType(dataTypeId: string) {
   if (dataTypeId === '972d0758-03c0-45e8-82e1-99815cbc77e5' || '1739b494-4404-4dcd-a386-a6221f5a2248') {
      return 'number';
    }else {
      return 'text';
    }
  }

  private getAttributes() {
    this.assetTypeService
    .getAssignedAttributes(this.assetType.assetTypeClassId)
    .subscribe(next => {
      this.assignedAttributes = next;
      this.setValues(next);
      this.setValuesFormArray(next);
      this.subscribeToValuesForm();
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });
  }

  private setValues(assignedAttributes: AssignedAttribute[]) {
    assignedAttributes.forEach( value => {
      if (this.values.findIndex(x => x.attributeId === value.attributeId) === -1) {
        this.values.push(new Value(value.attributeId, ''));
      }
    });
  }

  private subscribeToValuesForm() {
    for (const key in this.valuesForm.value) {
      if (this.valuesForm.value.hasOwnProperty(key)) {
        const index = this.values.findIndex(x => x.attributeId === key);
        this.valuesForm.get(key).valueChanges
          .subscribe(value2 => {
            this.values[index].text = value2;
          }, error2 => {
            console.log(error2);
          });
      }
    }
  }

  private setValuesFormArray(assignedAttributes: AssignedAttribute[]) {
    this.valuesForm = new FormGroup(this.buildValuesForm(assignedAttributes));
  }

  private buildValuesForm(assignedAttributes: AssignedAttribute[]) {
    const group: any = {};
    assignedAttributes.forEach(value => {
      const editValue = this.values.find(x => x.attributeId === value.attributeId).text;
      group[value.attributeId] = new FormControl( (editValue || ''), value.required ? [Validators.required] : null);
    });
    return group;
  }

  private removeValues(values: Value[]): Value[] {
      return values.filter(val => this.assignedAttributes.findIndex(x => x.attributeId === val.attributeId) !== -1);
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    console.log(this.values);
    this.assetTypeService
    .addAssetType(this.assetType, this.removeValues(this.values))
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
      .updateAssetType(this.assetType.assetTypeId, this.assetType, this.removeValues(this.values))
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
