import {Component, EventEmitter, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {AUTHENTICATION, REGISTER} from '../../app/routes';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign.up.modal.component.html',
  styleUrls: ['./sign.up.modal.component.css']
})
export class SignUpModalComponent {

  selectedType: string;
  onNext: EventEmitter<string> = new EventEmitter();
  onPrevious: EventEmitter<string> = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<SignUpModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) {

  }

  onSelect(type: string) {
    this.selectedType = type;
  }

  onSubmit() {
    this.dialogRef.close();
    this.router.navigate([`${AUTHENTICATION}/${REGISTER}/${this.data.accountType}/${this.selectedType}`]);
  }

}

