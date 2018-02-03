import {Component, OnInit} from "@angular/core";
import {PersonService} from "../../party.service";
import {Person} from "../../person";

@Component({
  selector: 'me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  private _me:Person;

  constructor(private personService:PersonService) {
  }

  ngOnInit(): void {
    var that = this;
    this
      .personService
      .getCurrentPerson()
      .subscribe(person => {
        that.me =  person;
      });
  }

  get me(): Person {
    return this._me;
  }

  set me(value: Person) {
    this._me = value;
  }

}