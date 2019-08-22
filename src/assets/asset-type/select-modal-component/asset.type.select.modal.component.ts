import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogPosition, MatDialog, MatDialogRef} from '@angular/material';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {AssetTypeCreateModalComponent} from '../create-modal-component/asset.type.create.modal.component';

@Component({
  selector: 'asset-type-select-modal',
  templateUrl: './asset.type.select.modal.component.html',
  styleUrls: ['././asset.type.select.modal.component.css']
})
export class AssetTypeSelectModalComponent {

  search: FormControl;
  faSearch = faSearch;
  recentArray: string[];
  commons: string[];
  constructor(
    public dialogRef: MatDialogRef<AssetTypeSelectModalComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog

  ) {
    this.recentArray = ['RAM'];
    this.commons = ['Building', 'vehicle', 'computer', 'manufacturing',
                     'communication', 'measurement instrument','other discrete item',
                      'Material Inventory', 'Lot', 'building'
    ];
    this.search = new FormControl('');
  }

  openCreateNew() {
    const dialogPosition: DialogPosition = {
      top: '139px',
      left: '418px'
    };
    const dialogRef = this.dialog.open(AssetTypeCreateModalComponent,  {
      height: 'calc(100% - 139px)',
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
