import {CdkStepper} from '@angular/cdk/stepper';
import {Component} from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  // This custom stepper provides itself as CdkStepper so that it can be recognized
  // by other components.
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }]
})

export class StepperComponent extends CdkStepper {
  onClick(index: number): void {
    this.selectedIndex = index;
  }
}
