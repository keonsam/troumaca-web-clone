import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {UnitOfMeasureRepository} from "./unit.of.measure.repository";
import {UnitOfMeasureService} from "./unit.of.measure.service";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
  ],
  providers: [{
    provide: UnitOfMeasureService,
    useFactory(unitOfMeasureRepository:UnitOfMeasureRepository) {
      let unitOfMeasureService: UnitOfMeasureService;
      if (!unitOfMeasureService) {
        unitOfMeasureService = new UnitOfMeasureService(unitOfMeasureRepository);
      }
      return unitOfMeasureService;
    },
    deps: [UnitOfMeasureRepository]
  }],
  exports: [
  ]
})
export class ActivityModule {}