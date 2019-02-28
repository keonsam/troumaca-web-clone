import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-delete-modal',
  templateUrl: 'delete.modal.component.html',
  styleUrls: ['delete.modal.component.css']
})

export class DeleteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }
}
