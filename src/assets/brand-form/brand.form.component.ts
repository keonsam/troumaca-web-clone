import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AssetService} from "../asset.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AssetBrand} from "../asset.brand";
import {Asset} from "../asset";

@Component({
  selector: 'app-asset-brand',
  templateUrl: './brand.form.component.html',
  styleUrls: ['./brand.form.component.css']
})

export class BrandFormComponent implements OnInit {

  name: FormControl;
  abbreviation: FormControl;
  description: FormControl;
  assetBrandForm: FormGroup;

  assetBrandExist = false;
  doNotDisplayFailureMessage = true;
  showConfirmMessage = false;

  private assetBrand: AssetBrand;
  private assetId: string;

  constructor(private assetService: AssetService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.assetBrand = new AssetBrand();

    this.name = new FormControl('', [Validators.required]);
    this.abbreviation = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);

    this.assetBrandForm = formBuilder.group({
      'name': this.name,
      'abbreviation': this.abbreviation,
      'description': this.description
    });

    this.assetBrandForm
      .valueChanges
      .subscribe( value => {
        this.assetBrand.name = value.name;
        this.assetBrand.abbreviation = value.abbreviation;
        this.assetBrand.description = value.description;
      });

    this.assetService.assetBrandState.subscribe( assetId => {
      if (assetId) {
        this.assetId = assetId;
        this.assetBrandForm.enable();
      }
    })
  }

  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['assetBrand']) {
      const assetBrand = this.route.snapshot.data['assetBrand'];
      this.setInputValues(assetBrand);
      this.assetBrandExist = true;
      this.assetBrand = assetBrand;
      this.assetService.assetCharacteristicsState.next(this.assetId);
    }else {
      this.assetBrandForm.disable();
    }
  }

  private setInputValues(assetBrand: AssetBrand) {
    this.name.setValue(assetBrand.name);
    this.abbreviation.setValue(assetBrand.abbreviation);
    this.description.setValue(assetBrand.description);
  }

  private getAssetBrand(assetId: string) {
    this.assetService.getAssetBrandById(assetId)
      .subscribe(assetBrand => {
        if (assetBrand && assetBrand.assetId) {
          this.assetBrand = assetBrand;
          this.setInputValues(assetBrand);
        }
      });
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.showConfirmMessage = false;

    this.assetBrand.assetId = this.assetId;
    this.assetService.addAssetBrand(this.assetBrand)
      .subscribe(value => {
        if (value && value.assetId) {
          this.assetService.assetCharacteristicsState.next(this.assetId);
          this.showConfirmMessage = true;
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
      });
  }

  onUpdate() {
    // this.doNotDisplayFailureMessage = true;
    // this.showConfirmMessage = false;
    //
    // this.assetService
    //   .updateAssetBrand(this.assetBrand.assetId, this.assetBrand)
    //   .subscribe(value => {
    //     if (value) {
    //       this.assetService.assetCharacteristicsState.next(this.assetId);
    //       this.showConfirmMessage = true;
    //     } else {
    //       this.doNotDisplayFailureMessage = false;
    //     }
    //   }, error => {
    //     console.log(error);
    //     this.doNotDisplayFailureMessage = false;
    //   });
  }

  cancel() {
    if (this.assetBrandExist) {
      this.getAssetBrand(this.assetBrand.assetId)
    }else {
      this.assetBrand = new AssetBrand();
      this.setInputValues(new AssetBrand());
    }
  }
}
