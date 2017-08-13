import {Component, OnInit} from "@angular/core";
import {PersonModel} from "./person.model";
import {PersonService} from "./person.service";

@Component({
  selector: 'persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  private _persons:PersonModel[];

  constructor(private personService: PersonService) {
  }

  ngOnInit(): void {
    var that = this;
    this
      .personService
      .getPersons()
      .subscribe(persons => {
        if (persons) {
          that.persons = persons;
        }
      });
  }

  get persons(): PersonModel[] {
    return this._persons;
  }

  set persons(value: PersonModel[]) {
    this._persons = value;
  }

}