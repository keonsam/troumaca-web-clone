import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CompleterService} from "ng2-completer";
import {AssetTypeClassService} from "../asset.type.class.service";
import {AssetTypeClass} from "../asset.type.class";
import {Router} from "@angular/router";

@Component({
  selector: 'asset-type-class-creation',
  templateUrl: './asset.type.class.creation.component.html',
  styleUrls: ['./asset.type.class.creation.component.css']
})
export class AssetTypeClassCreationComponent implements OnInit {

  private _name: FormControl;
  private _description: FormControl;

  private _assetTypeClassForm:FormGroup;

  private assetTypeClass: AssetTypeClass;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private assetTypeClassService:AssetTypeClassService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.name = new FormControl("", Validators.required);
    this.description = new FormControl("");

   this.assetTypeClassForm = formBuilder.group({
      "name": this.name,
      "description": this.description
    });

    this.assetTypeClass = new AssetTypeClass();

    this.assetTypeClassForm
    .valueChanges
    .subscribe(value => {
      this.assetTypeClass.name = value.name;
      this.assetTypeClass.description = value.description;
      console.log(value);
    }, error2 => {
      console.log(error2);
    });

    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {

  }

  get name(): FormControl {
    return this._name;
  }

  set name(value: FormControl) {
    this._name = value;
  }

  get description(): FormControl {
    return this._description;
  }

  set description(value: FormControl) {
    this._description = value;
  }

  get assetTypeClassForm(): FormGroup {
    return this._assetTypeClassForm;
  }

  set assetTypeClassForm(value: FormGroup) {
    this._assetTypeClassForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.assetTypeClassService
    .addAssetTypeClass(this.assetTypeClass)
    .subscribe(value => {
      if (value && value.assetTypeClassId) {
        this.router.navigate(['/asset-type-classes']);
      } else {
        this.doNotDisplayFailureMessage = false;
      }
    }, error => {
      console.log(error);
      this.doNotDisplayFailureMessage = false;
    });
  }

  cancel() {
    this.router.navigate(['/asset-type-classes']);
  }

}
