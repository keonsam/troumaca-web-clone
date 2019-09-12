import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogPosition, MatDialog, MatDialogRef} from '@angular/material';
import {faChevronDown, faChevronUp, faExclamationTriangle, faSearch} from '@fortawesome/free-solid-svg-icons';
import {AttributeSelectModalComponent} from '../../attributes/attributes-select-modal-component/attribute.select.modal.component';

@Component({
  selector: 'asset-type-create-modal',
  templateUrl: './asset.type.create.modal.component.html',
  styleUrls: ['././asset.type.create.modal.component.css']
})
export class AssetTypeCreateModalComponent {

  name: FormControl;
  description: FormControl;
  // faSearch = faSearch;
  // recentArray: string[];
  // commons: string[];
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faExclamationTriangle = faExclamationTriangle;
  constructor(
    public dialogRef: MatDialogRef<AssetTypeCreateModalComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    // this.recentArray = ['RAM'];
    // this.commons = ['Building', 'vehicle', 'computer', 'manufacturing',
    //   'communication', 'measurement instrument','other discrete item',
    //   'Material Inventory', 'Lot', 'building'
    // ];
    this.name = new FormControl('', [Validators.required]);
    this.description = new FormControl('');
  }

  newAttributeModal() {
    const dialogPosition: DialogPosition = {
      bottom: '0',
      left: '418px'
    };
    const dialogRef = this.dialog.open(AttributeSelectModalComponent,  {
      height: 'calc(100% - 96px)',
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
