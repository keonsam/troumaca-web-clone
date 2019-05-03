import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign.up.modal.component.html',
  styleUrls: ['./sign.up.modal.component.css']
})
export class SignUpModalComponent {

  constructor(
    public dialogRef: MatDialogRef<SignUpModalComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
