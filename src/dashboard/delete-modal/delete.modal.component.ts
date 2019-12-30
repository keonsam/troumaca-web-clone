import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  templateUrl: 'delete.modal.component.html',
  styleUrls: ['delete.modal.component.css'],
  selector: 'app-delete-modal'
})
export class DeleteModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { type: string, image: string, name: string },
    public dialogRef: MatDialogRef<DeleteModalComponent>,
  ) {
  }

  onNoClick() {
    this.dialogRef.close(true);
  }
}
