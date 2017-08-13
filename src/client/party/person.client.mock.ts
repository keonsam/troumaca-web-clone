import {PersonClient} from "./person.client";
import {Observable} from "rxjs/Observable";
import {PersonState} from "./person.state";
import {UUIDGenerator} from "../../uuid.generator";
import "rxjs/add/observable/of";

export class PersonClientMock implements PersonClient {

  constructor(private uuidGenerator: UUIDGenerator) {
  }

  public getPersons(): Observable<PersonState[]> {
    let persons:PersonState[] = [];

    let person1:PersonState = new PersonState();
    person1.partyId = this.uuidGenerator.generateUUID();
    person1.firstName = "Michael";
    person1.middleName = "Frederick";
    person1.lastName = "Williams";
    person1.dateOfBirth = new Date('1980-04-03');

    persons.push(person1);

    let person2:PersonState = new PersonState();
    person2.partyId = this.uuidGenerator.generateUUID();
    person2.firstName = "Michael";
    person2.lastName = "Sundell";
    person2.dateOfBirth = new Date('1982-04-03');

    persons.push(person2);

    let person3:PersonState = new PersonState();
    person3.partyId = this.uuidGenerator.generateUUID();
    person3.firstName = "Lawrence";
    person3.lastName = "Daniel";
    person3.dateOfBirth = new Date('1984-04-03');

    persons.push(person3);

    let person4:PersonState = new PersonState();
    person4.partyId = this.uuidGenerator.generateUUID();
    person4.firstName = "Wasswa";
    person4.lastName = "Senkandwa";
    person4.dateOfBirth = new Date('1986-04-03');

    persons.push(person4);

    let person5:PersonState = new PersonState();
    person5.partyId = this.uuidGenerator.generateUUID();
    person5.firstName = "Thomas";
    person5.lastName = "Sherman";
    person5.dateOfBirth = new Date('1988-04-03');

    persons.push(person5);

    let person6:PersonState = new PersonState();
    person6.partyId = this.uuidGenerator.generateUUID();
    person6.firstName = "Anthony";
    person6.lastName = "Daly";
    person6.dateOfBirth = new Date('1990-04-03');

    persons.push(person6);

    return Observable.of(persons);
  }


  public getCurrentPerson(): Observable<PersonState> {
    let personState:PersonState = new PersonState();
    personState.partyId = this.uuidGenerator.generateUUID();
    personState.firstName = "Michael";
    personState.middleName = "Frederick";
    personState.lastName = "Williams";
    personState.dateOfBirth = new Date('1980-04-03');

    return Observable.of(personState);
  }

}