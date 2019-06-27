import {Component } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-forget-saved',
  templateUrl: './forget.saved.component.html',
  styleUrls: ['./forget.saved.component.css']
})

export class ForgetSavedComponent {

  constructor(public dialogRef: MatDialogRef<ForgetSavedComponent>) {
  }

}
