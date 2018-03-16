import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";

import {AssetTypeService} from "../asset.type.service";
import {AssetType} from "../asset.type";
import {Value} from "../value";
import {Values} from "../values";
import {UnitOfMeasure} from "../../unit-of-measure/unit.of.measure";
import {AssetTypeClass} from "../../asset-type-classes/asset.type.class";
import {Attributes} from "../../attributes/attributes";
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";

@Component({
  selector: 'asset-type-edit',
  templateUrl: './asset.type.edit.component.html',
  styleUrls: ['./asset.type.edit.component.css']
})
export class AssetTypeEditComponent implements OnInit {

  private assetTypeId: string;
  private sub: any;
  private _assetTypeClassId: FormControl;
  private _name: FormControl;
  private _description: FormControl;
  private _modelNumber: FormControl;
  private _materielCode: FormControl;
  private _unitOfMeasureId: FormControl;

  private _assetTypeEditForm:FormGroup;
  private _attributeEditForm: FormGroup;

  private _assetTypeClassIdDataService: CompleterData;
  private _unitOfMeasureIdDataService: CompleterData;

  private assetType: AssetType;
  private _assignedAttributes: Attributes;

  private _values: Values;
  private _assetTypeClass: AssetTypeClass;

  private pageSize:number = 15;
  private _doNotDisplayFailureMessage:boolean;
  private _doNotDisplayFailureMessage2:boolean;
  private _doNotDisplayFailureMessage3:boolean;
  private errorCount: number = 0;
  private deleteError: boolean = true;
  private error: boolean = false;
  private isRequired: any[] = [];

  constructor(private assetTypeService:AssetTypeService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

      this.assetTypeClassId = new FormControl("", Validators.required);
      this.name = new FormControl("", Validators.required);
      this.description = new FormControl("");
      this.modelNumber = new FormControl("");
      this.materialCode = new FormControl("");
      this.unitOfMeasureId = new FormControl("");

      this.attributeEditForm = new FormGroup({});

      this.assetTypeEditForm = formBuilder.group({
        "assetTypeClassId": this.assetTypeClassId,
        "name": this.name,
        "description": this.description,
        "modelNumber": this.modelNumber,
        "materialCode": this.materialCode,
        "unitOfMeasureId": this.unitOfMeasureId
      });

      this.assetTypeEditForm
      .valueChanges
      .subscribe(value => {
       this.setAssetTypeValue(value);
        console.log(value);
      }, error2 => {
        console.log(error2);
      });

    let assetType = new AssetType();
    assetType.assetTypeClass = new AssetTypeClass();
    assetType.unitOfMeasure = new UnitOfMeasure();
    this.assetType = assetType;

    this.assignedAttributes = new Attributes();
    this.values = new Values();

    this.doNotDisplayFailureMessage = true;
    this.doNotDisplayFailureMessage2 = true;
    this.doNotDisplayFailureMessage3 = true;

  }

  ngOnInit(): void {
    let that = this;

    this.sub = this.route.params.subscribe(params => {
       this.assetTypeId = params['assetTypeId'];
       this.assetTypeService.getAssetType(this.assetTypeId)
       .subscribe(assetType =>{
        this.assetTypeClassId.setValue(assetType.assetTypeClass.name);
        this.name.setValue(assetType.name);
        this.description.setValue(assetType.description);
        this.modelNumber.setValue(assetType.modelNumber);
        this.materialCode.setValue(assetType.materialCode);
        this.unitOfMeasureId.setValue(assetType.unitOfMeasure.name);
        this.assetType = assetType;
        this.getAssetTypeClass();
      }, error => {
        console.log(error);
      }, () => {
        this.assetTypeEditForm
        .valueChanges
        .subscribe(value => {
          this.setAssetTypeValue(value);
          console.log(value);
        }, error2 => {
          console.log(error2);
        });
      })
    });

    this.populateAssetTypeClassIdDropDown();
    this.populateUnitOfMeasureIdDropDown();
  }

  private populateAssetTypeClassIdDropDown() {
    this.assetTypeClassIdDataService = this.completerService.local([], 'name', 'name');
    let that = this;
    this.assetTypeEditForm.get("assetTypeClassId").valueChanges
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
                assignedAttributes: v2.assignedAttributes
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
    this.assetTypeEditForm.get("unitOfMeasureId").valueChanges
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

  private getAssetTypeClass() {
    this.assetTypeService
    .getAssetTypeClass(this.assetType.assetTypeClass.assetTypeClassId)
    .subscribe(next => {
      this.assetType.assetTypeClass = next;
      this.getValues();
    },  error => {
      console.log(error);
    }, () => {
      console.log("complete");
    });
  }

  private getValues() {
    this.assetTypeService
    .getValues(this.assetTypeId)
    .subscribe(next => {
      this.values = next;
      this.getAttributes(this.assetType.assetTypeClass.assignedAttributes);
    }, error => {
      console.log(error);
    }, () => {
      console.log("complete");
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

  get assetTypeEditForm(): FormGroup {
    return this._assetTypeEditForm;
  }

  set assetTypeEditForm(value: FormGroup) {
    this._assetTypeEditForm = value;
  }

  get attributeEditForm(): FormGroup {
    return this._attributeEditForm;
  }

  set attributeEditForm(value: FormGroup) {
    this._attributeEditForm = value;
  }

  get assignedAttributes(): Attributes {
    return this._assignedAttributes;
  }

  set assignedAttributes(value: Attributes) {
    this._assignedAttributes = value;
  }

  get values(): Values {
    return this._values;
  }

  set values(value: Values) {
    this._values = value;
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

  get doNotDisplayFailureMessage3(): boolean {
    return this._doNotDisplayFailureMessage3;
  }

  set doNotDisplayFailureMessage3(value: boolean) {
    this._doNotDisplayFailureMessage3 = value;
  }

  getRequired(attributeId: string) {
    return this.isRequired.find(x => x.attributeId == attributeId).required;
  }

  onAssetTypeClassIdSelect(selected: CompleterItem) {
    if (selected) {
      this.assetType.assetTypeClass = selected.originalObject;
      this.getAttributes(selected.originalObject.assignedAttributes);
    }
  }

  onUnitOfMeasureIdSelect(selected: CompleterItem) {
    if (selected) {
      this.assetType.unitOfMeasure = selected.originalObject;
    }
  }


  setAssetTypeValue(value) {
    this.assetType.name = value.name;
    this.assetType.description = value.description;
    this.assetType.modelNumber = value.modelNumber;
    this.assetType.materialCode = value.materialCode;
  }

  onType(dataTypeName: string) {
   if(dataTypeName == "Decimal" || "Integer") {
      return "number";
    }else {
      return "text";
    }
  }

  getAttributes(assignedAttributes?: any[]) {
    this.isRequired = assignedAttributes;
    this.assetTypeService
    .getAttributes(this.assetType.assetTypeClass.assetTypeClassId)
    .subscribe(next => {
      this.assignedAttributes = next;
        let group: any = {};
        this.assignedAttributes.attributes.forEach(value => {
          let editValue = this.values.values.find(x => x.attributeId == value.attributeId);
          let required = assignedAttributes.find(x => x.attributeId == value.attributeId).required;
          if(!editValue) {
          this.values.values.push(new Value(value.attributeId, ""));
          editValue = this.values.values.find(x => x.attributeId == value.attributeId);
        }

        group[value.attributeId] = required ? new FormControl(editValue.text, [Validators.required])
                                            : new FormControl(editValue.text);
        });

        this.attributeEditForm = new FormGroup(group);
        for(let key in this.attributeEditForm.value){
          let index = this.values.values.findIndex(x => x.attributeId == key);
          this.attributeEditForm.get(key).valueChanges
          .subscribe(value2 => {
            this.values.values[index].text = value2;
          }, error2 => {
            console.log(error2);
          });
        }

    }, error => {
      console.log(error);
    });
  }

  saveValues() {
    this.error = false;
    for(let i= this.errorCount; i < this.values.values.length; i++){
      if(!this.values.values[i].valueId) {
        this.values.values[i].assetTypeId = this.assetTypeId;
        this.assetTypeService
        .addValue(this.values.values[i])
        .subscribe(value => {
          if(value && value.valueId){
            if(i == this.values.values.length -1){
              this.router.navigate(['/asset-types']);
            }
          }else {
            this.error = true;
            this.errorCount = i;
            this.doNotDisplayFailureMessage2 = false;
            return false;
          }
        }, error => {
          console.log(error);
          this.doNotDisplayFailureMessage2 = false;
        });

      }else {
        this.assetTypeService
        .updateValue(this.values.values[i])
        .subscribe(value => {
          if(value) {
            if(i == this.values.values.length -1){
            this.router.navigate(['/asset-types']);
          }
          }else {
            this.error = true;
            this.errorCount = i;
            this.doNotDisplayFailureMessage2 = false;
            return false;
          }
        }, error => {
          console.log(error);
          this.doNotDisplayFailureMessage2 = false;
        });

      }
   }
 }

  removeValues() {
    this.deleteError = false;
    let that = this;
    return Observable.create(function (observer) {
      that.values.values = that.values.values.filter((value, i) => {
        if(that.assignedAttributes.attributes.find(x => x.attributeId == value.attributeId)){
            return value;
          }else if (value.valueId) {
            that.assetTypeService
            .deleteValue(value.valueId)
            .subscribe(value => {
              if (!value) {
                that.deleteError = true
                that.doNotDisplayFailureMessage3 = false;
                observer.error(false);
                observer.complete();
              }
            }, error => {
              console.log(error);
              that.doNotDisplayFailureMessage3 = false;
            });
       }
     });
     observer.next(true);
     observer.complete();
   });
  }

  updateValues() {
      if(this.error){
        this.saveValues();
      }else {
        this.assetTypeService
        .updateAssetType(this.assetTypeId,this.assetType)
        .subscribe(value => {
          console.log("working");
          if (value) {
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

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.doNotDisplayFailureMessage2 = true;
    this.doNotDisplayFailureMessage3 = true;
    if(this.deleteError) {
    this.removeValues()
    .subscribe(value => {
      if(value) {
        this.updateValues();
        }
      });
    }else {
      this.updateValues();
    }
  }

  cancel() {
    this.router.navigate(['/asset-types']);
  }

}
