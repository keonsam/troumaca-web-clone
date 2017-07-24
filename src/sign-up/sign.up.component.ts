import {Component, OnInit} from "@angular/core";
import {SignUpService} from "./sign.up.service";

@Component({
  selector: 'sign-up',
  templateUrl: './sign.up.component.html',
  styleUrls: ['./sign.up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private signUpService:SignUpService) {
  }

  ngOnInit(): void {
  }

}