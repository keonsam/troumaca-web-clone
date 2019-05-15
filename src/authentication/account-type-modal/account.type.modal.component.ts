import {Component, EventEmitter, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-account-type-modal',
  templateUrl: './account.type.modal.component.html',
  styleUrls: ['./account.type.modal.component.css']
})
export class AccountTypeModalComponent {

  selectedType = 'personal';
  onNext: EventEmitter<string> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AccountTypeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.accountType) {
      this.selectedType = data.accountType;
    }
  }

  onSelect(type: string) {
    this.selectedType = type;
  }



}
