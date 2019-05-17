import {Component, EventEmitter} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {AUTHENTICATION, CONFIRMATION, FORGOT_PASSWORD, LOGIN} from '../../app/routes';
import {ChangePassword} from '../change.password';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {ValidResponse} from '../valid.response';

@Component({
  selector: 'app-forget-saved',
  templateUrl: './forget.saved.component.html',
  styleUrls: ['./forget.saved.component.css']
})

export class ForgetSavedComponent {

  constructor(public dialogRef: MatDialogRef<ForgetSavedComponent>) {
  }

}
