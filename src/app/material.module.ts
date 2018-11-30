import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [],
  imports: [MatInputModule, MatIconModule, MatCheckboxModule],
  exports: [MatInputModule, MatIconModule, MatCheckboxModule],
})
export class MaterialModule { }
