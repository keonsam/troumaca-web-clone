import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { UnitOfMeasureService } from './unit.of.measure.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {filter, map, debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-unit-of-measure',
  templateUrl: './unit.of.measure.component.html',
  styleUrls: ['./unit.of.measure.component.css']
})

export class UnitOfMeasureComponent implements OnInit {
  @Output() unitOfMeasureEvent = new EventEmitter<string>();
  @Input() initialUnitOfMeasureId: string;
  unitOfMeasure: FormControl;
  // unitOfMeasureDataService: CompleterData;
  private pageSize: 15;
  unitOfMeasureForm: FormGroup;


  constructor(private unitOfMeasureService: UnitOfMeasureService,
              // private completerService: CompleterService,
              private formBuilder: FormBuilder,
  ) {

    this.unitOfMeasure = new FormControl();
    this.unitOfMeasureForm = this.formBuilder.group({
      'unitOfMeasure': this.unitOfMeasure
    })
  }

  ngOnInit(): void {
    if (this.initialUnitOfMeasureId) {
      this.unitOfMeasure.setValue(this.initialUnitOfMeasureId);
    }

    this.populateUnitOfMeasureIdDropDown();
    this.unitOfMeasure
      .valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findUnitOfMeasureId(value);
      });
  }

  private populateUnitOfMeasureIdDropDown() {
    this.findUnitOfMeasureId('');
  }

  findUnitOfMeasureId(value) {
    this.unitOfMeasureService
      .findUnitOfMeasures(value, this.pageSize) // send search request to the backend
      .pipe(map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            unitOfMeasureId: v2.unitOfMeasureId,
            name: v2.name
          };
        })
      }))
      .subscribe(next => { // update the data
        // this.unitOfMeasureDataService = this.completerService.local(next, 'name', 'name');
      }, error => {
        console.log('finUnitOfMeasureId error - ' + error);
      });
  }

  // onUnitOfMeasureSelect(selected: CompleterItem) {
  //   this.unitOfMeasureEvent.emit(selected.originalObject.unitOfMeasureId);
  // }

}
