import {Component, OnInit} from '@angular/core';
import {PartyService} from '../../party.service';
import {Person} from '../../person';

@Component({
  selector: 'me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  private _me: Person;

  constructor(private partyService: PartyService) {
  }

  ngOnInit(): void {
    let that = this;
    /*this
      .partyService
      .getCurrentPerson()
      .subscribe(person => {
        that.me =  person;
      });*/
  }

  get me(): Person {
    return this._me;
  }

  set me(value: Person) {
    this._me = value;
  }

}
