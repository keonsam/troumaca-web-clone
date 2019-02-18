import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AssetIdentifierType} from '../asset.identifier.type';
import {AssetIdentifierTypeService} from '../asset.identifier.type.service';
import {ASSET_IDENTIFIER_TYPE, ASSET_SETTING} from '../../app/routes';

@Component({
  selector: 'app-asset-identifier-type-form',
  templateUrl: './asset.identifier.type.form.component.html',
  styleUrls: ['./asset.identifier.type.form.component.css']
})
export class AssetIdentifierTypeFormComponent implements OnInit {

  name: FormControl;
  description: FormControl;
  assetIdentifierTypeForm: FormGroup;

  update = false;
  doNotDisplayFailureMessage = true;

  private assetIdentifierType: AssetIdentifierType;
  private assetIdentifierTypeLink = `/${ASSET_SETTING}/${ASSET_IDENTIFIER_TYPE}/listing`;

  constructor(private assetIdentifierTypeService: AssetIdentifierTypeService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.assetIdentifierType = new AssetIdentifierType();

    this.name = new FormControl('', Validators.required);
    this.description = new FormControl('');

    this.assetIdentifierTypeForm = formBuilder.group({
      'name': this.name,
      'description': this.description
    });

    this.assetIdentifierTypeForm
      .valueChanges
      .subscribe(value => {
        this.assetIdentifierType.name = value.name;
        this.assetIdentifierType.description = value.description;
      });

  }

  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['assetIdentifierType']) {
      const assetIdentifierType = this.route.snapshot.data['assetIdentifierType'];
      this.setInputValues(assetIdentifierType);
      this.update = true;
      this.assetIdentifierType = assetIdentifierType;
    }
  }

  setInputValues(assetIdentifierType: AssetIdentifierType) {
    this.name.setValue(assetIdentifierType.name);
    this.description.setValue(assetIdentifierType.description);
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.assetIdentifierTypeService.addAssetIdentifierType(this.assetIdentifierType)
      .subscribe( value => {
        if (value && value.assetIdentifierTypeId) {
          this.router.navigate([this.assetIdentifierTypeLink]);
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

    this.assetIdentifierTypeService.updateAssetIdentifierType(this.assetIdentifierType)
      .subscribe( value => {
        if (value) {
          this.router.navigate([this.assetIdentifierTypeLink]);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      })
  }

  cancel() {
    this.router.navigate([this.assetIdentifierTypeLink]);
  }
}
