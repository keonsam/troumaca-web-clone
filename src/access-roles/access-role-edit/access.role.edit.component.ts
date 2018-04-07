import {Component, OnInit} from "@angular/core";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";
import {Router} from "@angular/router";

@Component({
  selector: 'access-role-edit',
  templateUrl: './access.role.edit.component.html',
  styleUrls: ['./access.role.edit.component.css']
})
export class AccessRoleEditComponent implements OnInit {

  ngOnInit(): void {
  }

}
