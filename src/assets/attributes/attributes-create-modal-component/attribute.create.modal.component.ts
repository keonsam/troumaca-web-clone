import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AttributeType} from '../attribute.type';
import {ATTRIBUTE_TYPES} from '../attribute.types';
import {Attribute} from '../attribute';
import {AttributeService} from '../attribute.service';
import {attributeFont} from '../attribute.font';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-attribute-create',
  templateUrl: './attribute.create.modal.component.html',
  styleUrls: ['./attribute.create.modal.component.css']
})
export class AttributeCreateModalComponent implements OnInit {
  private _types: AttributeType[] = ATTRIBUTE_TYPES;
  private _selected: string;

  private _label: FormControl;
  private _additionalInfo: FormControl;
  private _date: FormControl;

  private _panelActive: boolean;
  private _attribute: Attribute;
  private _attributeForm: FormGroup;

  private _arrayItems: string[] = ['',];
  private _dates: string[] = [
    'MM/DD/YY',
    'DD/MM/YY',
    'YY/MM/DD'
  ];

  private _selectType: string;
  private _selectLocation: string;
  private _defaultDate: string;

  constructor(
    public dialogRef: MatDialogRef<AttributeCreateModalComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private attributeService: AttributeService
  ) {
    this._defaultDate = localStorage.getItem("defaultDate") || this._dates[0];
    this._selectType = 'url';
    this._selectLocation = 'maps';
    this._panelActive = false;
    this._attribute = new Attribute();
    this._attributeForm = formBuilder.group({
      label: new FormControl('', [Validators.required]),
      additionalInfo: new FormControl(''),
      date: new FormControl(''),
      list: formBuilder.array([
        this.formBuilder.control(''),
      ], { validators: this.listValidator.bind(this)})
    });

    this.attributeForm
      .valueChanges
      .subscribe(value => {
        if (value.date !== this._attribute.format) {
          localStorage.setItem("defaultDate", value.date);
        }
        this._attribute.name = value.label;
        this._attribute.description = value.additionalInfo;
        this._attribute.format = value.date;
        this._attribute.list = value.list.filter(val => !!val);
      });
  }

  ngOnInit(): void {
    this._attributeForm.controls['date'].setValue(this._defaultDate);
  }


  get attributeForm(): FormGroup {
    return this._attributeForm;
  }

  get types(): AttributeType[] {
    return this._types;
  }

  get selected(): string {
    return this._selected;
  }

  get label(): FormControl | AbstractControl {
    return this.attributeForm.controls['label'];
  }

  get arrayItems(): string[] {
    return this._arrayItems;
  }

  get list(): FormArray {
    return this.attributeForm.get('list') as FormArray;
  }

  get date(): FormControl | AbstractControl {
    return this.attributeForm.controls['date'];
  }

  get dates(): string[] {
    return this._dates;
  }

  get panelActive(): boolean {
    return this._panelActive;
  }

  get additionalInfo(): FormControl | AbstractControl {
    return this.attributeForm.controls['additionalInfo']
  }

  selectedType(type: string) {
    this._selectType = type;
    this._attribute.type = type;
  }

  isSelectedType(type: string) {
    return this._selectType === type;
  }

  listValidator(control: FormArray): null {
    const index = control.controls.length > 0 ? control.controls.length - 1 : 0;
    if (control.controls[index].dirty) {
      this.addItem();
    }
    return null;
  }

  isURL() {
    return this.selected === 'URL';
  }

  selectedLocation(type: string) {
    this._selectLocation = type;
    this._attribute.type = type;
  }

  isSelectedLocation(type: string) {
    return this._selectLocation === type;
  }

  isLocation() {
    return this._selected === 'Location';
  }

  trackByFn(index, item) {
    return index;
  }

  isSelected(name) {
    return this._selected === name;
  }

  isList() {
    return this._selected === 'Select' || this._selected === 'Multi Select';
  }

  isDate() {
    return this.selected === 'Date';
  }

  addItem() {
    this._arrayItems.push('');
    this.list.push(this.formBuilder.control(''));
  }

  removeItem(i: number) {
    this._arrayItems = this._arrayItems.filter((v, e) => e !== i);
    this.list.removeAt(i);
  }

  onSelect(type: AttributeType) {
    this._selected = type.name;
    this._attribute.assetCharacteristicTypeId = type.assetCharacteristicTypeId;
    if (type.assetCharacteristicTypeId === '8') {
      this._attribute.type = this._selectType;
    }else if (type.assetCharacteristicTypeId === '9') {
      this._attribute.type = this._selectLocation;
    }
  }

  expandPanel() {
    this._panelActive = !this._panelActive;
  }

  getIcon(assetCharacteristicTypeId: string): IconProp {
    return attributeFont(assetCharacteristicTypeId);
  }

  onSubmit() {
    if(this._attribute.assetCharacteristicTypeId !== '6') {
      this._attribute.format = undefined;
    }
    if (this._attribute.assetCharacteristicTypeId !== '8' && this._attribute.assetCharacteristicTypeId !== '9') {
      this._attribute.type = undefined;
    }
    if (this._attribute.assetCharacteristicTypeId !== '4' && this._attribute.assetCharacteristicTypeId !== '5') {
      this._attribute.list = undefined;
    }
    console.log(this._attribute);
    this.attributeService
      .saveAttribute(this._attribute)
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

}
