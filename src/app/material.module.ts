import { NgModule } from '@angular/core';
// import {MatInputModule} from '@angular/material/input';
// import {MatIconModule} from '@angular/material/icon';
// import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatPaginatorModule} from '@angular/material/paginator';
// import {MatButtonModule} from '@angular/material/button';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
// import {MatSelectModule} from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
// import {MatTooltipModule} from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    // MatInputModule,
    // MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // using
    // MatIconModule,
    // MatCheckboxModule,
    // MatPaginatorModule,
    // MatAutocompleteModule,
    // MatSelectModule,
    // MatTooltipModule
  ],
  exports: [
    // MatInputModule,
    // MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // using
    // MatIconModule,
    // MatCheckboxModule,
    // MatPaginatorModule,
    // MatAutocompleteModule,
    // MatSelectModule,
    // MatTooltipModule
  ],
})
export class MaterialModule { }
