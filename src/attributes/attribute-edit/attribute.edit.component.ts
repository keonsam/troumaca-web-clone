import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";

import {AttributeService} from "../attribute.service";
import {Attribute} from "../attribute";
import {DataType} from "../data.type";
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";
import {UnitOfMeasure} from "../../unit-of-measure/unit.of.measure";

@Component({
  selector: 'attribute-edit',
  templateUrl: './attribute.edit.component.html',
  styleUrls: ['./attribute.edit.component.css']
})

export class AttributeEditComponent implements OnInit {

  private attributeId: string;
  private sub: any;
  private _name: FormControl;
  private _format: FormControl;
  private _dataType: FormControl;
  private _unitOfMeasureId: FormControl;
  private _maximumValue: FormControl;
  private _minimumValue: FormControl;

  private _unitOfMeasureIdDataService: CompleterData;

  private _attributeEditForm: FormGroup;

  private attribute: Attribute;
  private _dataTypes: DataType[];

  private _doNotDisplayFailureMessage:boolean;
  private pageSize: number = 15;

  constructor(private attributeService: AttributeService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.name = new FormControl("", [Validators.required]);

    this.format = new FormControl("");

    this.dataType = new FormControl("", [Validators.required]);

    this.unitOfMeasureId = new FormControl("");

    this.maximumValue = new FormControl("");

    this.minimumValue = new FormControl("");

    this.attributeEditForm = formBuilder.group({
      "name": this.name,
      "format": this.format,
      "dataType": this.dataType,
      "unitOfMeasureId": this.unitOfMeasureId,
      "maximumValue": this.maximumValue,
      "minimumValue": this.minimumValue
    });

    let attribute = new Attribute();
    attribute.unitOfMeasure = new UnitOfMeasure();
    this.attribute = attribute;

    this.dataTypes = [];
    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    let that = this;
    this.attributeService
    .getDataTypes()
    .subscribe(dataTypes => {
      if (dataTypes) {
        that.dataTypes = dataTypes.dataTypes;
      }
    }, onError => {
      console.log(onError);
    });

    this.sub = this.route.params.subscribe(params => {
       this.attributeId = params['attributeId'];
       this.attributeService.getAttributeById(this.attributeId)
       .subscribe(attribute =>{
        this.name.setValue(attribute.name);
        this.format.setValue(attribute.format);
        this.dataType.setValue(attribute.dataType.dataTypeId);
        this.unitOfMeasureId.setValue(  attribute.unitOfMeasure.name); // backend needs to set the value
        this.maximumValue.setValue(attribute.maximumValue);
        this.minimumValue.setValue(attribute.minimumValue);
        this.attribute = attribute;
      }, error => {
        console.log(error);
      }, () => {
        this.attributeEditForm
        .valueChanges
        .subscribe(value => {
          this.attribute.name = value.name;
          this.attribute.format = value.format;
          this.attribute.dataType = this.dataTypes.find(x => x.dataTypeId == value.dataType);
          this.attribute.maximumValue = value.maximumValue;
          this.attribute.minimumValue = value.minimumValue;
        }, error2 => {
          console.log(error2);
        });
      })
    });

    this.populateUnitOfMeasureIdDropDown();
  }

  private populateUnitOfMeasureIdDropDown() {
    if (!this.attribute.unitOfMeasure.unitOfMeasureId) {
      this.findUnitOfMeasureId("");
    }

    this.attributeEditForm.get("unitOfMeasureId").valueChanges
      .filter(value => { // filter out empty values
        return !!(value);
      })
      .subscribe(value => {
        this.findUnitOfMeasureId(value);
      });
  }

  findUnitOfMeasureId(value) {
    this.attributeService
      .findUnitOfMeasureId(value, this.pageSize) // send search request to the backend
      .map(value2 => { // convert results to dropdown data
        return value2.map(v2 => { //update to the new way of doing this
          return {
            unitOfMeasureId: v2.unitOfMeasureId,
            name: v2.name,
          };
        })
      })
      .subscribe(next => { // update the data
        this.unitOfMeasureIdDataService = this.completerService.local(next, 'name', 'name');
      }, error => {
        console.log("findUnitOfMeasureId error - " + error);
      });
  }

  get name(): FormControl {
    return this._name;
  }

  set name(value: FormControl) {
    this._name = value;
  }

  get format(): FormControl {
    return this._format;
  }

  set format(value: FormControl) {
    this._format = value;
  }

  get dataType(): FormControl {
    return this._dataType;
  }

  set dataType(value: FormControl) {
    this._dataType = value;
  }

  get dataTypes(): DataType[] {
    return this._dataTypes;
  }

  set dataTypes(value: DataType[]) {
    this._dataTypes = value;
  }

  get unitOfMeasureId(): FormControl {
    return this._unitOfMeasureId;
  }

  set unitOfMeasureId(value: FormControl) {
    this._unitOfMeasureId = value;
  }

  get maximumValue(): FormControl {
    return this._maximumValue;
  }

  set maximumValue(value: FormControl) {
    this._maximumValue = value;
  }

  get minimumValue(): FormControl {
    return this._minimumValue;
  }

  set minimumValue(value: FormControl) {
    this._minimumValue = value;
  }

  get unitOfMeasureIdDataService(): CompleterData {
    return this._unitOfMeasureIdDataService;
  }

  set unitOfMeasureIdDataService(value: CompleterData) {
    this._unitOfMeasureIdDataService = value;
  }

  get attributeEditForm(): FormGroup {
    return this._attributeEditForm;
  }

  set attributeEditForm(value: FormGroup) {
    this._attributeEditForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  onUnitOfMeasureIdSelect(selected: CompleterItem) {
    if (selected) {
      this.attribute.unitOfMeasure = selected.originalObject;
    }
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.attributeService
    .updateAttribute(this.attributeId, this.attribute)
    .subscribe(value => {
      if (value) {
        this.router.navigate(['/attributes']);
      } else {
        this.doNotDisplayFailureMessage = false;
      }
    }, error => {
      console.log(error);
      this.doNotDisplayFailureMessage = false;
    });
  }

  cancel() {
    this.router.navigate(['/attributes']);
  }

}
