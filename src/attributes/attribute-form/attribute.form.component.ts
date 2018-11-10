import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
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

export class AttributeFormComponent implements OnInit, OnChanges {
  name: FormControl;
  format: FormControl;
  dataType: FormControl;
  maximumValue: FormControl;
  minimumValue: FormControl;

  attributeForm: FormGroup;

  private attribute: Attribute;
  dataTypes: DataType[];

  doNotDisplayFailureMessage: boolean;
  attributeExist = false;
  unitOfMeasureId: string;
  @Input() attributeId: string;
  @Input() modalType: string;
  @Output() closeModal = new EventEmitter<boolean>();

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

  ngOnChanges(): void {
    if (this.modalType === 'edit') {
      this.attributeService
        .getAttributeById(this.attributeId)
        .subscribe(attribute => {
          if (attribute.attributeId) {
            this.setInputValues(attribute);
          }
        });
    } else if (this.modalType === 'new') {
      this.attribute = new Attribute();
      this.name.setValue('');
      this.format.setValue('');
      this.dataType.setValue('');
      this.maximumValue.setValue('');
      this.minimumValue.setValue('');
      this.unitOfMeasureId = '';
      this.attributeExist = false;
    }
  }

  private setInputValues(attribute: Attribute) {
    this.name.setValue(attribute.name);
    this.format.setValue(attribute.format);
    this.dataType.setValue(attribute.dataTypeId);
    this.maximumValue.setValue(attribute.maximumValue);
    this.minimumValue.setValue(attribute.minimumValue);
    this.unitOfMeasureId = attribute.unitOfMeasure ? attribute.unitOfMeasure.name : '';
    this.attribute = attribute;
    this.attributeExist = true;
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
          if (this.modalType) {
            this.closeModal.emit(true);
          } else {
            this.router.navigate(['/attributes']);
          }
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
          if (this.modalType) {
            this.closeModal.emit(true);
          } else {
            this.router.navigate(['/attributes']);
          }
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
