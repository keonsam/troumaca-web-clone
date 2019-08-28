import {Component} from '@angular/core';
import {faChevronLeft, faChevronRight, faImage, faTag, faThLarge} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogPosition, MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AssetTypeSelectModalComponent} from '../asset-type/select-modal-component/asset.type.select.modal.component';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'asset-create-modal',
  templateUrl: './asset.create.modal.html',
  styleUrls: ['./asset.create.modal.css']
})
export class AssetCreateModal {
  faImage = faImage;
  faThLarge = faThLarge;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faTag = faTag;
  name: FormControl;
  assetForm: FormGroup;
  dialogRefTypes: MatDialogRef<AssetTypeSelectModalComponent>;

  constructor(
    public dialogRef: MatDialogRef<AssetCreateModal>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.name = new FormControl('', [Validators.required]);
    this.assetForm = formBuilder.group({
      'name': this.name
    })
  }

  openSelectType() {
    const dialogPosition: DialogPosition = {
      left: '418px'
    };
    this.dialogRefTypes = this.dialog.open(AssetTypeSelectModalComponent,  {
      height: '100%',
      width: '706px',
      position: dialogPosition,
      hasBackdrop: true,
      backdropClass: 'backdrop-left',
      closeOnNavigation: true,
      disableClose: false,
      panelClass: ['left-panel-2'],
    });
    this.dialogRefTypes.afterClosed().subscribe( () => {
        this.dialogRefTypes = undefined;
    }
    );
  }

  closeSelectType() {
    this.dialogRefTypes.close();
  }

}
