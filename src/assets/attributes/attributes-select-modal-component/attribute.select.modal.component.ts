import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl} from '@angular/forms';
import {faMapMarkerAlt, faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'attribute-select',
  templateUrl: './attribute.select.modal.component.html',
  styleUrls: ['./attribute.select.modal.component.css']
})
export class AttributeSelectModalComponent {
  search: FormControl;
  faSearch = faSearch;
  faMapMarker = faMapMarkerAlt;
  recentArray: string[];
  commons: string[];
  constructor(
    public dialogRef: MatDialogRef<AttributeSelectModalComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.recentArray = ['Color'];
    this.commons = ['Purchase Date', 'Storage Location'];
    this.search = new FormControl('');
  }

  openCreateNew() {}
}
