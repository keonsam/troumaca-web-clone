import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AssetService} from "../asset.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AssetSpecification} from "../asset.specification";
import {Asset} from "../asset";

@Component({
  selector: 'app-asset-specification',
  templateUrl: './specification.form.component.html',
  styleUrls: ['./specification.form.component.css']
})

export class SpecificationFormComponent implements OnInit {

  name: FormControl;
  type: FormControl;
  partOf: FormControl;
  modelNumber: FormControl;
  standardPrice: FormControl;
  effectiveDate: FormControl;
  description: FormControl;
  assetSpecificationForm: FormGroup;

  types: string[];

  doNotDisplayFailureMessage = true;
  assetSpecExist = false;
  showConfirmMessage = false;

  private assetSpecification: AssetSpecification;
  private assetId: string;

  constructor(private assetService: AssetService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.types = [];
    this.assetSpecification = new AssetSpecification();


    this.name = new FormControl('', [Validators.required]);
    this.type = new FormControl('', [Validators.required]);
    this.partOf = new FormControl('');
    this.modelNumber = new FormControl('', [Validators.required]);
    this.standardPrice = new FormControl('');
    this.effectiveDate = new FormControl(new Date(), [Validators.required]);
    this.description = new FormControl('');

    this.assetSpecificationForm = formBuilder.group({
      'name': this.name,
      'type': this.type,
      'partOf': this.partOf,
      'modelNumber': this.modelNumber,
      'standardPrice': this.standardPrice,
      'effectiveDate': this.effectiveDate,
      'description': this.description
    });

    this.assetSpecificationForm
      .valueChanges
      .subscribe(value => {
        this.assetSpecification.name = value.specificationName;
        this.assetSpecification.type = value.specificationType;
        this.assetSpecification.partOf = value.partOf;
        this.assetSpecification.modelNumber = value.modelNumber;
        this.assetSpecification.standardPrice = value.standardPrice;
        this.assetSpecification.effectiveDate = value.effectiveDate;
        this.assetSpecification.description = value.description1;
      });
    this.assetService.assetSpecificationState.subscribe(assetId => {
      if (assetId) {
        this.assetId = assetId;
        this.assetSpecificationForm.enable();
      }
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['assetSpecification']) {
      const assetSpec = this.route.snapshot.data['assetSpecification'];
      this.setInputValues(assetSpec);
      this.assetSpecExist = true;
      this.assetSpecification = assetSpec;
      this.assetService.assetBrandState.next(this.assetId);
    } else {
      this.assetSpecificationForm.disable();
    }
  }

  private setInputValues(assetSpecification: AssetSpecification) {
    this.name.setValue(assetSpecification.name);
    this.type.setValue(assetSpecification.type);
    this.partOf.setValue(assetSpecification.partOf);
    this.modelNumber.setValue(assetSpecification.modelNumber);
    this.standardPrice.setValue(assetSpecification.standardPrice);
    this.effectiveDate.setValue(assetSpecification.effectiveDate);
    this.description.setValue(assetSpecification.description);
  }

  private getAssetSpecification(assetId: string) {
    this.assetService.getAssetSpecById(assetId)
      .subscribe(assetSpec => {
        if (assetSpec && assetSpec.assetId) {
          this.assetSpecification = assetSpec;
          this.setInputValues(assetSpec);
        }
      });
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.showConfirmMessage = false;
    this.assetSpecification.assetId = this.assetId;
    this.assetService.addAssetSpec(this.assetSpecification)
      .subscribe(value => {
        if (value && value.assetId) {
          this.assetService.assetBrandState.next(this.assetId);
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
    // this.assetService
    //   .updateAssetSpec(this.assetSpecification.assetId, this.assetSpecification)
    //   .subscribe(value => {
    //     if (value) {
    //       this.assetService.assetBrandState.next(this.assetId);
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
    if (this.assetSpecExist) {
      this.getAssetSpecification(this.assetSpecification.assetId)
    }else {
      this.assetSpecification = new AssetSpecification();
      this.setInputValues(new AssetSpecification());
    }
  }
}
