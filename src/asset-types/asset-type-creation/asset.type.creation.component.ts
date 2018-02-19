import {Component, OnInit} from "@angular/core";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";
import {AssetTypeService} from "../asset.type.service";
import {AssetType} from "../asset.type";
import {Value} from "../value";
import {AssetTypeClass} from "../../asset-type-classes/asset.type.class";
import {Attributes} from "../../attributes/attributes";
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

  private _assetTypeForm:FormGroup;

  private assetType: AssetType;
  private _assignedAttributes: Attributes;

  private _value: Value[] = [];

  private pageSize:number = 15;
  private _doNotDisplayFailureMessage:boolean;
  private _doNotDisplayFailureMessage2:boolean;
  private errorCount: number = 0;

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
    this.assetType = assetType;

    this.assignedAttributes = new Attributes();

    this.assetTypeForm
    .valueChanges
    .subscribe(value => {
      this.assetType.name = value.name;
      this.assetType.description = value.description;
      this.assetType.modelNumber = value.modelNumber;
      this.assetType.materialCode = value.materialCode;
      this.assetType.unitOfMeasureId = value.unitOfMeasureId;
      console.log(value);
    }, error2 => {
      console.log(error2);
    });

    this.doNotDisplayFailureMessage = true;
    this.doNotDisplayFailureMessage2 = true;

  }

  ngOnInit(): void {
   let that = this;

   this.populateAssetTypeClassIdDropDown();

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
                attributeId: v2.assignedAttributes
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

  get assetTypeForm(): FormGroup {
    return this._assetTypeForm;
  }

  set assetTypeForm(value: FormGroup) {
    this._assetTypeForm = value;
  }
  get assignedAttributes(): Attributes {
    return this._assignedAttributes;
  }

  set assignedAttributes(value: Attributes) {
    this._assignedAttributes = value;
  }

  get value(): Value[] {
    return this._value;
  }

  set value(value: Value[]) {
    this._value = value;
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
      this.assetType.assetTypeClass = selected.originalObject;
      this.getAttributes();
    }
  }

  getAttributes() {
      this.value = [];

    this.assetTypeService
    .getAttributes(this.assetType.assetTypeClass.assetTypeClassId)
    .subscribe(next => {
      this.assignedAttributes = next;
      this.assignedAttributes.attributes.forEach((value, i) => {
        this.assetTypeForm.addControl(value.attributeId, new FormControl("",Validators.required));
        this.value.push(new Value(value.attributeId, ""));
        this.assetTypeForm.get(value.attributeId).valueChanges
        .subscribe(value2 => {
          this.value[i].text = value2;
          console.log(value);
        }, error2 => {
          console.log(error2);
        });

      });
    }, error => {
      console.log(error);
    }, () => {
      console.log("complete");
    });
  }

  saveValues() {
      for(let i= this.errorCount; i < this.value.length; i++){
        this.value[i].assetTypeId = this.assetType.assetTypeId;
        this.assetTypeService
        .addValue(this.value[i])
        .subscribe(value => {
          if(value && value.valueId){
            if(i == this.value.length -1){
              this.router.navigate(['/asset-types']);
            }
          }else{
            this.errorCount = i;
            this.doNotDisplayFailureMessage2 = false;
          }
        }, error => {
          console.log(error);
          this.doNotDisplayFailureMessage2 = false;
        });
    }
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.doNotDisplayFailureMessage2 = true;
    if(this.errorCount > 0){
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
