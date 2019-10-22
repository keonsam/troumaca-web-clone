import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AttributeType} from '../attribute.type';
import {ATTRIBUTE_TYPES} from '../attribute.types';
import {
  faBars,
  faChevronDown, faChevronUp, faExclamationTriangle, faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import {Attribute} from '../attribute';
import {AttributeService} from '../attribute.service';
import {attributeFont} from '../attribute.font';

@Component({
  selector: 'app-attribute-create',
  templateUrl: './attribute.create.modal.component.html',
  styleUrls: ['./attribute.create.modal.component.css']
})
export class AttributeCreateModalComponent implements OnInit {
  types: AttributeType[] = ATTRIBUTE_TYPES;
  selected: string;

  label: FormControl;
  preFilled: FormControl;
  required: FormControl;
  preFilledValue: FormControl;
  additionalInfo: FormControl;
  select: FormControl;
  date: FormControl;

  panelActive: boolean;
  attribute: Attribute;
  attributeForm: FormGroup;

  arrayItems: string[] = ['', '',];
  items: string[];
  dates: string[] = [
    'MM - DD - YY',
    'DD - MM - YY',
    'YY - MM - DD'
  ];

  // icons
  faExclamationTriangle = faExclamationTriangle;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faTrashAlt = faTrashAlt;
  faBars = faBars;

  constructor(
    public dialogRef: MatDialogRef<AttributeCreateModalComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private attributeService: AttributeService
  ) {
    this.panelActive = false;
    this.attribute = new Attribute();
    // form
    this.label = new FormControl('', [Validators.required]);
    this.preFilled = new FormControl(false);
    this.required = new FormControl(false);
    this.preFilledValue = new FormControl(null);
    this.select = new FormControl(null);
    this.date = new FormControl('MM - DD - YY');
    this.additionalInfo = new FormControl('');
    this.attributeForm = formBuilder.group({
      'label': this.label,
      'preFilled': this.preFilled,
      'required': this.required,
      'preFilledValue': this.preFilledValue,
      'additionalInfo': this.additionalInfo,
      // list
      'list': formBuilder.array([
        this.formBuilder.control(''),
        this.formBuilder.control('')
      ])
    });

    this.attributeForm
      .valueChanges
      .subscribe(value => {
        // attribute
        this.items = value.list.filter(val => !!val);
        this.attribute.preFilled = value.preFilled;
        this.attribute.required = value.required;
        this.attribute.defaultValue = value.preFilledValue;
        this.attribute.description = value.additionalInfo;
        this.attribute.list = value.list;
      });
  }

  ngOnInit(): void {
  }

  trackByFn(index, item) {
    return index;
  }

  isSelected(name) {
    return this.selected === name;
  }

  isList() {
    return this.selected === 'Select' || this.selected === 'Multi Select';
  }

  get list() {
    return this.attributeForm.get('list') as FormArray;
  }

  addItem() {
    this.arrayItems.push('');
    this.list.push(this.formBuilder.control(''));
  }

  removeItem(i: number) {
    this.arrayItems = this.arrayItems.filter((v, e) => e !== i);
    this.list.removeAt(i);
  }

  onSelect(type: AttributeType) {
    this.selected = type.name;
    this.attribute.assetCharacteristicTypeId = type.assetCharacteristicTypeId;
  }

  expandPanel() {
    this.panelActive = !this.panelActive;
  }

  getIcon(assetCharacteristicTypeId: string) {
    return attributeFont(assetCharacteristicTypeId);
  }

  onSubmit() {
    this.attributeService
      .saveAttribute(this.attribute)
      .subscribe(value => {
        if (value && value.assetCharacteristicId) {
          this.dialogRef.close(true);
        } else {
          console.error('error');
        }
      }, error => {
        console.error(error);
      });
  }

  defaultUI() {
    return this.preFilled.value && this.selected !== 'Checkbox';
  }
}
