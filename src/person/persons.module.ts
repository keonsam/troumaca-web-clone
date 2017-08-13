import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PersonsComponent} from "./persons.component";
import {PersonService} from "./person.service";
import {PersonRepository} from "./person.repository";
import {RouterModule} from "@angular/router";
import {PersonModule} from "./create-new/person.module";
import {MeModule} from "./me/me.module";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PersonModule,
    MeModule
  ],
  declarations: [
    PersonsComponent
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
    PersonsComponent
  ]
})
export class PersonsModule {}