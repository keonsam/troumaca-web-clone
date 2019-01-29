import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {debounceTime, filter, map} from 'rxjs/operators';
import {AssetService} from '../asset.service';

@Component({
  selector: 'app-asset-spec-form',
  templateUrl: './asset.specification.form.component.html',
  styleUrls: ['./asset.specification.form.component.css']
})

export class AssetSpecificationFormComponent implements OnInit {

  brands: any[];
  @Input() parentForm: FormGroup;
  @Output() onBrandSelect: EventEmitter<string> = new EventEmitter();
  private pageSize = 5;

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {
    this.populateBrandsDropDown();
  }

  private populateBrandsDropDown() {
    this.findBrands('');
    this.parentForm.get('brand').valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findBrands(value);
      });
  }

  private findBrands(value) {
    this.assetService
      .findBrands(value, this.pageSize) // send search request to the backend
      .pipe(map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            brandId: v2.brandId,
            name: v2.name
          };
        })
      }))
      .subscribe(next => { // update the data
        this.brands = next;
      }, error => {
        console.log('findAssets error - ' + error);
      });
  }

}
