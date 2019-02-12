import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AssetNameType} from '../asset.name.type';
import {AssetNameTypeService} from '../asset.name.type.service';
import {ASSET_NAME_TYPE} from '../../app/routes';

@Component({
  selector: 'app-asset-name-type-form',
  templateUrl: './asset.name.type.form.component.html',
  styleUrls: ['./asset.name.type.form.component.css']
})
export class AssetNameTypeFormComponent implements OnInit {

  name: FormControl;
  description: FormControl;
  assetNameTypeForm: FormGroup;

  update = false;
  doNotDisplayFailureMessage = true;

  private assetNameType: AssetNameType;

  constructor(private assetNameTypeService: AssetNameTypeService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.assetNameType = new AssetNameType();

    this.name = new FormControl('', Validators.required);
    this.description = new FormControl('');

    this.assetNameTypeForm = formBuilder.group({
      'name': this.name,
      'description': this.description
    });

    this.assetNameTypeForm
      .valueChanges
      .subscribe(value => {
        this.assetNameType.name = value.name;
        this.assetNameType.description = value.description;
      });

  }

  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['assetNameType']) {
      const assetNameType = this.route.snapshot.data['assetNameType'];
      this.setInputValues(assetNameType);
      this.update = true;
      this.assetNameType = assetNameType;
    }
  }

  setInputValues(assetNameType: AssetNameType) {
    this.name.setValue(assetNameType.name);
    this.description.setValue(assetNameType.description);
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.assetNameTypeService.addAssetNameType(this.assetNameType)
      .subscribe( value => {
        if (value && value.assetNameTypeId) {
          this.router.navigate([ASSET_NAME_TYPE]);
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

    this.assetNameTypeService.updateAssetNameType(this.assetNameType)
      .subscribe( value => {
        if (value) {
          this.router.navigate([ASSET_NAME_TYPE]);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      })
  }

  cancel() {
    this.router.navigate([ASSET_NAME_TYPE]);
  }
}
