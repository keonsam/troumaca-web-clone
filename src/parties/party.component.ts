import {Component, OnInit} from "@angular/core";
import {Person} from "./person";
import {PersonService} from "./party.service";

@Component({
  selector: 'party',
  templateUrl:'./party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

  private _persons:Person[];

  constructor(private personService: PersonService) {
  }

  ngOnInit(): void {
    // var that = this;
    // this
    //   .personService
    //   .getPersons()
    //   .subscribe(persons => {
    //     if (persons) {
    //       that.persons = persons;
    //     }
    //   });
  }

  get persons(): Person[] {
    return this._persons;
  }

  set persons(value: Person[]) {
    this._persons = value;
  }

}