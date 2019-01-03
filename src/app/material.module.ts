import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material";

@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule],
  exports: [MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule],
  providers: [ MatDatepickerModule],
})
export class MaterialModule { }
