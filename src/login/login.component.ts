import {Component, Inject, OnInit} from "@angular/core";
import {LoginService} from "./login.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import {Event} from "./event";
import {LoginModel} from "./login.model";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {Router} from "@angular/router";
import {EventService} from "../event/event.service";
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

}