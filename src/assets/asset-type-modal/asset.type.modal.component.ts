import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-asset-type-modal',
  templateUrl: './asset.type.modal.component.html',
})
export class AssetTypeModalComponent {

  constructor(dialogRef: MatDialogRef<AssetTypeModalComponent>) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
