import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AttributeService} from '../attribute.service';
import {Attribute} from '../attribute';
import {DataType} from '../data.type';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-attribute-form',
  templateUrl: './attribute.form.component.html',
  styleUrls: ['./attribute.form.component.css']
})

export class AttributeFormComponent implements OnInit {
  private _name: FormControl;
  private _format: FormControl;
  private _dataType: FormControl;
  private _maximumValue: FormControl;
  private _minimumValue: FormControl;


  private _attributeForm: FormGroup;

  private attribute: Attribute;
  private _dataTypes: DataType[];

  private _doNotDisplayFailureMessage: boolean;
  public attributeExist: false;
  public unitOfMeasureId: string;

  constructor(private attributeService: AttributeService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.name = new FormControl('', [Validators.required]);

    this.format = new FormControl('');

    this.dataType = new FormControl('', [Validators.required]);

    this.maximumValue = new FormControl('');

    this.minimumValue = new FormControl('');

    this.attributeForm = formBuilder.group({
      'name': this.name,
      'format': this.format,
      'dataType': this.dataType,
      'unitOfMeasureId': this.unitOfMeasureId,
      'maximumValue': this.maximumValue,
      'minimumValue': this.minimumValue
    });

    this.attribute = new Attribute();

    this.attributeForm
    .valueChanges
    .subscribe(value => {
      this.attribute.name = value.name;
      this.attribute.format = value.format;
      this.attribute.dataTypeId = value.dataType;
      this.attribute.maximumValue = value.maximumValue;
      this.attribute.minimumValue = value.minimumValue;
    }, error2 => {
      console.log(error2);
    });

    this.dataTypes = [];

    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    const that = this;
    this.attributeService
    .getDataTypes()
    .subscribe(dataTypes => {
      if (dataTypes) {
        that.dataTypes = dataTypes;
      }
    }, onError => {
      console.log(onError);
    });

    if (this.route.snapshot && this.route.snapshot.data['attribute']) {
      this.setInputValues(this.route.snapshot.data['attribute']);
    }
  }

  private setInputValues(attribute: Attribute) {
    this.name.setValue(attribute.name);
    this.format.setValue(attribute.format);
    this.dataType.setValue(attribute.dataTypeId);
    this.maximumValue.setValue(attribute.maximumValue);
    this.minimumValue.setValue(attribute.minimumValue);
    this.unitOfMeasureId = attribute.unitOfMeasureName;
    this.attribute = attribute;
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

  setUnitOfMeasureId(unitOfMeasureId: string) {
    this.attribute.unitOfMeasureId = unitOfMeasureId;
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

  onUpdate() {
    this.doNotDisplayFailureMessage = true;
    this.attributeService
      .updateAttribute(this.attribute.attributeId, this.attribute)
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
