import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PartyComponent} from "./party.component";
import {PersonService} from "./party.service";
import {PersonRepository} from "./party.repository";
import {RouterModule} from "@angular/router";
import {PersonComponent} from "./persons/person-creation/person.component";
import {MeComponent} from "./persons/person-me/me.component";
import {PersonListComponent} from "./persons/person-list/person.list.component";
import {MenuModule} from "../menu/menu.module";
// import {MeModule} from "./me/me.module";
// ,
// MeModule
// ,
// PersonModule

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule
  ],
  declarations: [
    PartyComponent,
    PersonComponent,
    PersonListComponent,
    MeComponent
  ],
  providers: [{
    provide: PersonService,
    useFactory(personRepository:PersonRepository) {
      let personService: PersonService;
      if (!personService) {
        personService = new PersonService(personRepository);
      }
      return personService;
    },
    deps: [PersonRepository]
  }],
  exports: [
    PartyComponent,
    PersonComponent,
    PersonListComponent,
    MeComponent
  ]
})
export class PartyModule {}