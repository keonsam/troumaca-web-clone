import {NgModule} from '@angular/core';
import {MatStepperModule, MatTabsModule, MatDialogModule} from '@angular/material';

@NgModule({
  imports: [MatStepperModule, MatTabsModule, MatDialogModule],
  exports: [MatStepperModule, MatTabsModule, MatDialogModule]
})

export class MaterialModule { }
