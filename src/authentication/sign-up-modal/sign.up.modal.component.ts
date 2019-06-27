import {Component, EventEmitter, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {AUTHENTICATION, REGISTER} from '../../app/routes';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {faGoogle} from '@fortawesome/free-brands-svg-icons/faGoogle';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faMobileAlt} from '@fortawesome/free-solid-svg-icons/faMobileAlt';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign.up.modal.component.html',
  styleUrls: ['./sign.up.modal.component.css']
})
export class SignUpModalComponent {

  selectedType: string;
  onNext: EventEmitter<string> = new EventEmitter();
  onPrevious: EventEmitter<string> = new EventEmitter();
  faArrowLeft = faArrowLeft;
  faGoogle = faGoogle;
  faEnvelope = faEnvelope;
  faMobileAlt = faMobileAlt;

  constructor(public dialogRef: MatDialogRef<SignUpModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) {
  }

  onSelect(type: string) {
    this.selectedType = type;
    this.router.navigate([`${AUTHENTICATION}/${REGISTER}/${this.data.accountType}/${type}`]);
    this.dialogRef.close();
  }

  // onSubmit() {
  //   this.dialogRef.close();
  // }

}

