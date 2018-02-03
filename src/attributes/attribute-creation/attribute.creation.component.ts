import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AttributeService} from "../attribute.service";
import {Attribute} from "../attribute";
import {Router} from "@angular/router";

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

  private _attributeForm: FormGroup;

  private attribute: Attribute;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private attributeService: AttributeService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.name = new FormControl("");

    this.format = new FormControl("");

    this.dataType = new FormControl("");

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

    this.attribute = new Attribute();

    this.attributeForm
    .valueChanges
    .subscribe(value => {
      this.attribute.name = value.name;
      this.attribute.format = value.format;
      this.attribute.dataType = value.dataType;
      this.attribute.unitOfMeasureId = value.unitOfMeasureId;
      this.attribute.maximumValue = value.maximumValue;
      this.attribute.minimumValue = value.minimumValue;
      console.log(value);
    }, error2 => {
      console.log(error2);
    });

    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
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
