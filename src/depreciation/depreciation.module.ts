import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import { ReactiveFormsModule } from '@angular/forms';
import {DepreciationComponent} from "./depreciation.component";
import {DepreciationCreationComponent} from "./depreciation-creation/depreciation.creation.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {depreciationServiceProvider} from "./depreciation.service.provider";
import {Ng2CompleterModule} from "ng2-completer";
import {PagingModule} from "../paging/paging.module";
import {DepreciationEditComponent} from './depreciation-edit/depreciation.edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    Ng2CompleterModule,
    ReactiveFormsModule,
    PagingModule
  ],
  declarations: [
    DepreciationComponent,
    DepreciationCreationComponent,
    DepreciationEditComponent,
    ScheduleComponent
  ],
  providers: [depreciationServiceProvider],
  exports: [
    DepreciationComponent,
    DepreciationCreationComponent,
    DepreciationEditComponent,
    ScheduleComponent
  ]
})

export class DepreciationModule {}
