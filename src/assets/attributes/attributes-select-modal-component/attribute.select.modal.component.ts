import {Component} from '@angular/core';
import {DialogPosition, MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl} from '@angular/forms';
import {faMapMarkerAlt, faSearch} from '@fortawesome/free-solid-svg-icons';
import {AttributeCreateModalComponent} from '../attributes-create-modal-component/attribute.create.modal.component';

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

  openCreateNew() {
    const dialogPosition: DialogPosition = {
      bottom: '0',
      left: '418px'
    };
    const dialogRef = this.dialog.open(AttributeCreateModalComponent,  {
      height: 'calc(100% - 150px)',
      width: '706px',
      position: dialogPosition,
      hasBackdrop: true,
      backdropClass: 'backdrop-left',
      closeOnNavigation: true,
      disableClose: false,
      panelClass: ['left-panel-2'],
    })
  }
}
