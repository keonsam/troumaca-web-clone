import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl} from '@angular/forms';
import {AttributeType} from '../attribute.type';
import {ATTRIBUTE_TYPES} from '../attribute.types';

@Component({
  selector: 'attribute-create',
  templateUrl: './attribute.create.modal.component.html',
  styleUrls: ['./attribute.create.modal.component.css']
})
export class AttributeCreateModalComponent {
  types: AttributeType[] = ATTRIBUTE_TYPES;
  selected: string;
  constructor(
    public dialogRef: MatDialogRef<AttributeCreateModalComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
  }

  onSelect(name: string) {
    console.log(name);
    this.selected = name;
  }
}
