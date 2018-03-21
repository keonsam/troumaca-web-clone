import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";

import {AttributeService} from "../attribute.service";
import {Attribute} from "../attribute";
import {DataType} from "../data.type";
import {Router} from "@angular/router";
import {UnitOfMeasure} from "../../unit-of-measure/unit.of.measure";

@Component({
  selector: 'attribute-creation',
  templateUrl: './attribute.creation.component.html',
  styleUrls: ['./attribute.creation.component.css']
})

export class AttributeCreationComponent implements OnInit {
  private _name: FormControl;
  private _format: FormControl;
  private _dataType: FormControl;
  private _unitOfMeasureId: FormControl;
  private _maximumValue: FormControl;
  private _minimumValue: FormControl;

  private _unitOfMeasureIdDataService: CompleterData;

  private _attributeForm: FormGroup;

  private attribute: Attribute;
  private _dataTypes: DataType[];

  private _doNotDisplayFailureMessage:boolean;
  private pageSize: number = 15;

  constructor(private attributeService: AttributeService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.name = new FormControl("", [Validators.required]);

    this.format = new FormControl("");

    this.dataType = new FormControl("",[Validators.required]);

    this.unitOfMeasureId = new FormControl("");

    this.maximumValue = new FormControl("");

    this.minimumValue = new FormControl("");

    this.attributeForm = formBuilder.group({
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

    this.attributeForm
    .valueChanges
    .subscribe(value => {
      this.attribute.name = value.name;
      this.attribute.format = value.format;
      this.attribute.dataType = this.dataTypes.find(x => x.dataTypeId == value.dataType);
      this.attribute.maximumValue = value.maximumValue;
      this.attribute.minimumValue = value.minimumValue;
      console.log(value);
    }, error2 => {
      console.log(error2);
    });

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

    this.populateUnitOfMeasureIdDropDown();
  }

  private populateUnitOfMeasureIdDropDown() {
    this.unitOfMeasureIdDataService = this.completerService.local([], 'name', 'name');
    let that = this;
    this.attributeForm.get("unitOfMeasureId").valueChanges
      .debounceTime(1000) // debounce
      .filter(value => { // filter out empty values
        return !!(value);
      })
      .subscribe(value => {
        console.log("value: " + value);
        that.attributeService
          .findUnitOfMeasureId(value, that.pageSize) // send search request to the backend
          .map(value2 => { // convert results to dropdown data
            return value2.map(v2 => { //update to the new way of doing this
              return {
                unitOfMeasureId: v2.unitOfMeasureId,
                name: v2.name,
              };
            })
          })
          .subscribe(next => { // update the data
            console.log("findUnitOfMeasureId next - " + next);
            this.unitOfMeasureIdDataService = this.completerService.local(next, 'name', 'name');
          }, error => {
            console.log("findUnitOfMeasureId error - " + error);
          });
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

  get attributeForm(): FormGroup {
    return this._attributeForm;
  }

  set attributeForm(value: FormGroup) {
    this._attributeForm = value;
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
    .addAttribute(this.attribute)
    .subscribe(value => {
      if (value && value.attributeId) {
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
