import {Component, OnInit} from "@angular/core";
import {PersonService} from "../person.service";
import {PersonModel} from "../person.model";

@Component({
  selector: 'me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  private _me:PersonModel;

  constructor(private personService:PersonService) {
  }

  ngOnInit(): void {
    var that = this;
    this
      .personService
      .getCurrentPerson()
      .subscribe(personModel => {
        that.me =  personModel;
      });
  }

  get me(): PersonModel {
    return this._me;
  }

  set me(value: PersonModel) {
    this._me = value;
  }

}