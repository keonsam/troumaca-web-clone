import {Component, OnInit} from "@angular/core";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";
import {AssetTypeService} from "../asset.type.service";
import {AssetType} from "../asset.type";
import {Value} from "../value";
import {AssetTypeClass} from "../../asset-type-classes/asset.type.class";
import {UnitOfMeasure} from "../../unit-of-measure/unit.of.measure";
import {Attribute} from "../../attributes/attribute";
import {AssignedAttribute} from "../../asset-type-classes/assigned.attribute";
import {Router} from "@angular/router";

@Component({
  selector: 'asset-type-creation',
  templateUrl: './asset.type.creation.component.html',
  styleUrls: ['./asset.type.creation.component.css']
})
export class AssetTypeCreationComponent implements OnInit {

  private _assetTypeClassId: FormControl;
  private _name: FormControl;
  private _description: FormControl;
  private _modelNumber: FormControl;
  private _materielCode: FormControl;
  private _unitOfMeasureId: FormControl;

  private _assetTypeClassIdDataService: CompleterData;
  private _unitOfMeasureIdDataService: CompleterData;


  private _assetTypeForm:FormGroup;
  private _attributeForm: FormGroup;

  private assetType: AssetType;

  private _assignedAttributes: AssignedAttribute[];
  private _attributes: Attribute[] = [];

  private _value: Value[] = [];
  private _saveValue: Value[];

  private pageSize:number = 15;
  private _doNotDisplayFailureMessage:boolean;
  private _doNotDisplayFailureMessage2:boolean;

  constructor(private assetTypeService:AssetTypeService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private router: Router) {

      this.assetTypeClassId = new FormControl("", Validators.required);
      this.name = new FormControl("", Validators.required);
      this.description = new FormControl("");
      this.modelNumber = new FormControl("");
      this.materialCode = new FormControl("");
      this.unitOfMeasureId = new FormControl("");

      this.attributeForm = new FormGroup({

      });

      this.assetTypeForm = formBuilder.group({
        "assetTypeClassId": this.assetTypeClassId,
        "name": this.name,
        "description": this.description,
        "modelNumber": this.modelNumber,
        "materialCode": this.materialCode,
        "unitOfMeasureId": this.unitOfMeasureId
      });

    let assetType = new AssetType();
    assetType.assetTypeClass = new AssetTypeClass();
    assetType.unitOfMeasure = new UnitOfMeasure();
    this.assetType = assetType;

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

    this.saveValue = [];
    this.doNotDisplayFailureMessage = true;
    this.doNotDisplayFailureMessage2 = true;

  }

  ngOnInit(): void {

   this.populateAssetTypeClassIdDropDown();
    this.populateUnitOfMeasureIdDropDown();
  }

  private populateAssetTypeClassIdDropDown() {
    this.assetTypeClassIdDataService = this.completerService.local([], 'name', 'name');
    let that = this;
    this.assetTypeForm.get("assetTypeClassId").valueChanges
      .debounceTime(1000) // debounce
      .filter(value => { // filter out empty values
        return !!(value);
      })
      .subscribe(value => {
        console.log("value: " + value);
        that.assetTypeService
          .findAssetTypeClassId(value, that.pageSize) // send search request to the backend
          .map(value2 => { // convert results to dropdown data
            return value2.assetTypeClasses.map(v2 => {
              return {
                assetTypeClassId: v2.assetTypeClassId,
                name: v2.name,
              };
            })
          })
          .subscribe(next => { // update the data
            console.log("findAssetTypeClassId next - " + next);
            this.assetTypeClassIdDataService = this.completerService.local(next, 'name', 'name');
          }, error => {
            console.log("findAssetTypeClassId error - " + error);
          });
      });
  }

  private populateUnitOfMeasureIdDropDown() {
    this.unitOfMeasureIdDataService = this.completerService.local([], 'name', 'name');
    let that = this;
    this.assetTypeForm.get("unitOfMeasureId").valueChanges
      .debounceTime(1000) // debounce
      .filter(value => { // filter out empty values
        return !!(value);
      })
      .subscribe(value => {
        console.log("value: " + value);
        that.assetTypeService
          .findUnitOfMeasureId(value, that.pageSize) // send search request to the backend
          .map(value2 => { // convert results to dropdown data
            return value2.map(v2 => {
              return {
                unitOfMeasureId: v2.unitOfMeasureId,
                name: v2.name
              };
            })
          })
          .subscribe(next => { // update the data
            console.log("findUnitOfMeasureId next - " + next);
            this.unitOfMeasureIdDataService = this.completerService.local(next, 'name', 'name');
          }, error => {
            console.log("finUnitOfMeasureId error - " + error);
          });
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

  get unitOfMeasureId(): FormControl {
    return this._unitOfMeasureId;
  }

  set unitOfMeasureId(value: FormControl) {
    this._unitOfMeasureId = value;
  }

  get assetTypeClassIdDataService(): CompleterData {
    return this._assetTypeClassIdDataService;
  }

  set assetTypeClassIdDataService(value: CompleterData) {
    this._assetTypeClassIdDataService = value;
  }

  get unitOfMeasureIdDataService(): CompleterData {
    return this._unitOfMeasureIdDataService;
  }

  set unitOfMeasureIdDataService(value: CompleterData) {
    this._unitOfMeasureIdDataService = value;
  }

  get assetTypeForm(): FormGroup {
    return this._assetTypeForm;
  }

  set assetTypeForm(value: FormGroup) {
    this._assetTypeForm = value;
  }

  get attributeForm(): FormGroup {
    return this._attributeForm;
  }

  set attributeForm(value: FormGroup) {
    this._attributeForm = value;
  }

  get assignedAttributes(): AssignedAttribute[] {
    return this._assignedAttributes;
  }

  set assignedAttributes(value: AssignedAttribute[]) {
    this._assignedAttributes = value;
  }

  get attributes(): Attribute[] {
    return this._attributes;
  }

  set attributes(value: Attribute[]) {
    this._attributes = value;
  }

  get value(): Value[] {
    return this._value;
  }

  set value(value: Value[]) {
    this._value = value;
  }

  get saveValue(): Value[] {
    return this._saveValue;
  }

  set saveValue(value: Value[]) {
    this._saveValue = value;
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

  getRequired(attributeId: string) {
    return this.assignedAttributes.find(x => x.attributeId == attributeId).required;
  }

  onAssetTypeClassIdSelect(selected: CompleterItem) {
    if (selected) {
      this.assetType.assetTypeClass = selected.originalObject;
    }
    this.getAttributes();
  }

  onUnitOfMeasureIdSelect(selected: CompleterItem) {
    if (selected) {
      this.assetType.unitOfMeasure = selected.originalObject;
    }
  }

  onType(dataTypeName: string) {
   if(dataTypeName == "Decimal" || "Integer") {
      return "number";
    }else {
      return "text";
    }
  }

  getAttributes() {
    this.assetTypeService
    .getAssignedAttributes(this.assetType.assetTypeClass.assetTypeClassId)
    .subscribe(next => {
      this.assignedAttributes = next.assignedAttribute;
      this.attributes = next.attributes;
      let group: any = {};
      this.attributes.forEach(value => {
      let editValue = this.value.find(x => x.attributeId == value.attributeId);
      let required = this.assignedAttributes.find(x => x.attributeId == value.attributeId).required;
      if(!editValue) {
        this.value.push(new Value(value.attributeId,""));
        editValue = this.value.find(x => x.attributeId == value.attributeId);
      }
        group[value.attributeId] = required ? new FormControl(editValue.text, [Validators.required])
                                            : new FormControl(editValue.text);
        console.log(group);
      });

      this.attributeForm = new FormGroup(group);
      for(let key in this.attributeForm.value){
        let index = this.value.findIndex(x => x.attributeId == key);
        this.attributeForm.get(key).valueChanges
        .subscribe(value2 => {
          console.log(value2);
          this.value[index].text = value2;
          console.log(this.value[index].text);
        }, error2 => {
          console.log(error2);
        });
      };

    }, error => {
      console.log(error);
    }, () => {
      console.log("complete");
    });
  }

  saveValues() {

    this.saveValue.forEach(value => {
      value.assetTypeId = this.assetType.assetTypeId
    });
    this.assetTypeService
      .addValue(this.saveValue)
      .subscribe( value => {
        if(value){
          this.router.navigate(['/asset-types']);
        }else {
          this.doNotDisplayFailureMessage2 = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage2 = false;
      });
  }

  removeValues() {
      this.saveValue = this.value.filter((value) => {
      if(this.attributes.find(x => x.attributeId == value.attributeId)){
          return value;
        }
      });
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.doNotDisplayFailureMessage2 = true;
    this.removeValues();

    if(this.assetType.assetTypeId){
      this.saveValues();
    }else {
      this.assetTypeService
      .addAssetType(this.assetType)
      .subscribe(value => {
        if (value && value.assetTypeId) {
          this.assetType.assetTypeId = value.assetTypeId;
          this.saveValues();
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
    }
  }

  cancel() {
    this.router.navigate(['/asset-types']);
  }

}
