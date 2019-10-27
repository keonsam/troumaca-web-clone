import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AttributeType} from '../attribute.type';
import {ATTRIBUTE_TYPES} from '../attribute.types';
import {Attribute} from '../attribute';
import {AttributeService} from '../attribute.service';
import {attributeFont} from '../attribute.font';

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

  private _arrayItems: string[] = ['', '',];
  private _items: string[];
  private _dates: string[] = [
    'MM - DD - YY',
    'DD - MM - YY',
    'YY - MM - DD'
  ];

  constructor(
    public dialogRef: MatDialogRef<AttributeCreateModalComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private attributeService: AttributeService
  ) {
    this._panelActive = false;
    this._attribute = new Attribute();
    this._attributeForm = formBuilder.group({
      label: new FormControl('', [Validators.required]),
      additionalInfo: new FormControl(''),
      date: new FormControl('MM - DD - YY'),
      list: formBuilder.array([
        this.formBuilder.control(''),
        this.formBuilder.control('')
      ])
    });

    this.attributeForm
      .valueChanges
      .subscribe(value => {
        // attribute
        this.items = value.list.filter(val => !!val);
        this.attribute.name = value.label;
        this.attribute.description = value.additionalInfo;
        this.attribute.list = this.items;
      });
  }

  ngOnInit(): void {
  }

  get attributeForm(): FormGroup {
    return this._attributeForm;
  }

  get types(): AttributeType[] {
    return this._types;
  }

  list() {
    return this.attributeForm.get('list') as FormArray;
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

  getIcon(assetCharacteristicTypeId: string): string[] {
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

}
