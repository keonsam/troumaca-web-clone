import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import {Event} from "./event";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {Router} from "@angular/router";
import {EventService} from "../event/event.service";
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

}