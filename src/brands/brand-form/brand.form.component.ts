import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Brand} from '../brand';
import {BrandService} from '../brand.service';
import {ASSET_SETTING, BRANDS} from '../../app/routes';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand.form.component.html',
  styleUrls: ['./brand.form.component.css']
})
export class BrandFormComponent implements OnInit {

  name: FormControl;
  abbreviation: FormControl;
  description: FormControl;
  brandForm: FormGroup;

  update = false;
  doNotDisplayFailureMessage = true;

  private brand: Brand;
  private brandLink = `/${ASSET_SETTING}/${BRANDS}/listing`;

  constructor(private brandService: BrandService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.brand = new Brand();

    this.name = new FormControl('', Validators.required);
    this.abbreviation = new FormControl('');
    this.description = new FormControl('');

    this.brandForm = formBuilder.group({
      'name': this.name,
      'abbreviation': this.abbreviation,
      'description': this.description
    });

    this.brandForm
      .valueChanges
      .subscribe(value => {
        this.brand.name = value.name;
        this.brand.abbreviation = value.abbreviation;
        this.brand.description = value.description;
      });

  }

  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['brand']) {
      const brand = this.route.snapshot.data['brand'];
      this.setInputValues(brand);
      this.update = true;
      this.brand = brand;
    }
  }

  setInputValues(brand: Brand) {
    this.name.setValue(brand.name);
    this.abbreviation.setValue(brand.abbreviation);
    this.description.setValue(brand.description);
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.brandService.addBrand(this.brand)
      .subscribe( value => {
        if (value && value.brandId) {
          this.router.navigate([this.brandLink])
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      })
  }

  onUpdate() {
    this.doNotDisplayFailureMessage = true;

    this.brandService.updateBrand(this.brand)
      .subscribe( value => {
        if (value) {
          this.router.navigate([this.brandLink])
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      })
  }

  cancel() {
    this.router.navigate([this.brandLink]);
  }
}
