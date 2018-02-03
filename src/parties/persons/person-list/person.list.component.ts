import {Component, OnInit} from "@angular/core";
import {Person} from "../../person";
import {PersonService} from "../../party.service";

@Component({
  selector: 'person-list',
  templateUrl:'./person.list.component.html',
  styleUrls: ['./person.list.component.css']
})
export class PersonListComponent implements OnInit {

  ngOnInit(): void {
  }

}