import {Component, OnInit} from "@angular/core";
import {AssetService} from "../asset.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AssetCharacteristics} from "../asset.characteristics";
import {AssetBrand} from "../asset.brand";

@Component({
  selector: 'app-asset-characteristics',
  templateUrl: './characteristics.form.component.html',
  styleUrls: ['./characteristics.form.component.css']
})

export class CharacteristicsFormComponent implements OnInit {

  name: FormControl;
  value: FormControl;
  optional: FormControl;
  effectiveDate: FormControl;
  untilDate: FormControl;
  assetCharacteristicsForm: FormGroup;

  assetCharacteristicsExist = false;
  doNotDisplayFailureMessage = true;

  private assetCharacteristics: AssetCharacteristics;
  private assetId: string;

  constructor(private assetService: AssetService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.assetCharacteristics = new AssetCharacteristics();

    this.name = new FormControl('', [Validators.required]);
    this.value = new FormControl('', [Validators.required]);
    this.optional = new FormControl('', [Validators.required]);
    this.effectiveDate = new FormControl(new Date(), [Validators.required]);
    this.untilDate = new FormControl('', [Validators.required]);

    this.assetCharacteristicsForm = formBuilder.group({
      'name': this.name,
      'value': this.value,
      'optional': this.optional,
      'effectiveDate': this.effectiveDate,
      'untilDate': this.untilDate
    });

    this.assetCharacteristicsForm
      .valueChanges
      .subscribe( value => {
        this.assetCharacteristics.name = value.name;
        this.assetCharacteristics.value = value.value;
        this.assetCharacteristics.optional = value.optional;
        this.assetCharacteristics.effectiveOn = value.effectiveDate;
        this.assetCharacteristics.until = value.untilDate;
      });

    this.assetService.assetCharacteristicsState.subscribe( value => {
      if (value) {
        this.assetId = value;
        this.assetCharacteristicsForm.enable();
      }
    })
  }

  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['assetCharacteristics']) {
      const assetCharacteristics = this.route.snapshot.data['assetCharacteristics'];
      this.setInputValues(assetCharacteristics);
      this.assetCharacteristicsExist = true;
      this.assetCharacteristics = assetCharacteristics;
    } else {
      this.assetCharacteristicsForm.disable();
    }
  }

  private setInputValues(assetCharacteristics: AssetCharacteristics) {
    this.name.setValue(assetCharacteristics.name);
    this.value.setValue(assetCharacteristics.value);
    this.optional.setValue(assetCharacteristics.optional);
    this.effectiveDate.setValue(assetCharacteristics.effectiveOn);
    this.untilDate.setValue(assetCharacteristics.until);
  }

  private getAssetCharacteristics(assetId: string) {
    this.assetService.getAssetCharacteristicsById(assetId)
      .subscribe(assetCharacteristics => {
        if (assetCharacteristics && assetCharacteristics.assetId) {
          this.assetCharacteristics = assetCharacteristics;
          this.setInputValues(assetCharacteristics);
        }
      });
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.assetCharacteristics.assetId = this.assetId;
    this.assetService.addAssetCharacteristics(this.assetCharacteristics)
      .subscribe(value => {
        if (value && value.assetId) {
          this.router.navigate(['/assets']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
      });
  }

  onUpdate() {
    // this.doNotDisplayFailureMessage = true;
    // this.assetService
    //   .updateAssetCharacteristics(this.assetCharacteristics.assetId, this.assetCharacteristics)
    //   .subscribe(value => {
    //     if (value) {
    //       this.router.navigate(['/assets']);
    //     } else {
    //       this.doNotDisplayFailureMessage = false;
    //     }
    //   }, error => {
    //     console.log(error);
    //     this.doNotDisplayFailureMessage = false;
    //   });
  }

  cancel() {
    if (this.assetCharacteristicsExist) {
      this.getAssetCharacteristics(this.assetCharacteristics.assetId)
    }else {
      this.assetCharacteristics = new AssetCharacteristics();
      this.setInputValues(new AssetCharacteristics());
    }
  }
}
