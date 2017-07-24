import {Component, Inject, OnInit} from "@angular/core";
import {LoginService} from "./login.service";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(@Inject('loginSubject') private loginSubject:Subject<boolean>, private loginService:LoginService) {
  }

  ngOnInit(): void {
  }

}