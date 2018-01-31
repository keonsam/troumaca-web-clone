import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AttributeService} from "../attribute.service";
import {Attribute} from "../attribute";
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router";

@Component({
  selector: 'attribute-edit',
  templateUrl: './attribute.edit.component.html',
  styleUrls: ['./attribute.edit.component.css']
})

export class AttributeEditComponent implements OnInit {

  private _attributeId: string;
  private sub: any;
  private _name: FormControl;
  private _format: FormControl;
  private _dataType: FormControl;
  private _unitOfMeasureId: FormControl;
  private _maximumValue: FormControl;
  private _minimumValue: FormControl;

  private _attributeEditForm: FormGroup;

  private attribute: Attribute;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private attributeService: AttributeService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.name = new FormControl("");

    this.format = new FormControl("");

    this.dataType = new FormControl("");

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

    this.attribute = new Attribute();

    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
       this.attributeId = params['attributeId'];
       this.attributeService.getAttributeById(this.attributeId)
       .subscribe(attribute =>{
        this.name.setValue(attribute.name);
        this.format.setValue(attribute.format);
        this.dataType.setValue(attribute.dataType);
        this.unitOfMeasureId.setValue(attribute.unitOfMeasureId);
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
          this.attribute.dataType = value.dataType;
          this.attribute.unitOfMeasureId = value.unitOfMeasureId;
          this.attribute.maximumValue = value.maximumValue;
          this.attribute.minimumValue = value.minimumValue;
          console.log(value);
        }, error2 => {
          console.log(error2);
        });
      })
    });
  }

  get attributeId(): string {
    return this._attributeId;
  }

  set attributeId(value: string) {
    this._attributeId = value;
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
