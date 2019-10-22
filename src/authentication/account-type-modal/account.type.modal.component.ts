import {Component, EventEmitter, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faUsers} from '@fortawesome/free-solid-svg-icons/faUsers';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';

@Component({
  selector: 'app-account-type-modal',
  templateUrl: './account.type.modal.component.html',
  styleUrls: ['./account.type.modal.component.css']
})
export class AccountTypeModalComponent {

  private selectedType: string;
  personal: boolean;
  corporate: boolean;
  onNext: EventEmitter<string> = new EventEmitter();
  faUser = faUser;
  faUsers = faUsers;
  faCheck = faCheck;

  constructor(
    public dialogRef: MatDialogRef<AccountTypeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      accountType: string
    }) {
    this.selectedType = 'personal';
    if (data.accountType) {
      this.selectedType = data.accountType;
    }
  }

  onSelect(type: string) {
    this.selectedType = type;
    if (type === 'personal') {
      this.personal = true;
      this.corporate = false;
    } else {
      this.personal = false;
      this.corporate = true;
    }
  }

  next() {
    this.onNext.emit(this.selectedType);
  }
}
