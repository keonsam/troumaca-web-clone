import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AssetService} from "../../assets/asset.service";
import {CompleterService} from "ng2-completer";
import {AssetTypeClassService} from "../asset.type.class.service";
import {AssetTypeClass} from "../asset.type.class";

@Component({
  selector: 'asset-type-class-creation',
  templateUrl: './asset.type.class.creation.component.html',
  styleUrls: ['./asset.type.class.creation.component.css']
})
export class AssetTypeClassCreationComponent implements OnInit {

  private _name: FormControl;
  private _description: FormControl;
  private _assetTypeClassForm:FormGroup;

  constructor(private assetTypeClassService:AssetTypeClassService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder) {
    this.name = new FormControl("", Validators.required);
    this.description = new FormControl("");


   this.assetTypeClassForm = formBuilder.group({
      "name": this.name,
      "description": this.description
    });
  }

  get name(): FormControl {
    return this._name;
  }

  set name(value: FormControl) {
    this._name = value;
  }

  get assetTypeClassForm(): FormGroup {
    return this._assetTypeClassForm;
  }

  set assetTypeClassForm(value: FormGroup) {
    this._assetTypeClassForm = value;
  }

  get description(): FormControl {
    return this._description;
  }

  set description(value: FormControl) {
    this._description = value;
  }

  ngOnInit(): void {
  }

  enableSubmit():boolean {
    if (!this.name) {
      return false;
    } else {
      return true;
    }
  }

  onCreate() {
  }

  onReset() {
  }

  onSubmit() {
    if (this.name) {
      let id= "1233";
      let name = this.name.value;
      let description = this.name.value;
      let assetTypeClasses: AssetTypeClass = new AssetTypeClass(undefined, name, description); // validate
     this.assetTypeClassService.addAssetTypeClass(assetTypeClasses)
      .subscribe(value => {
        console.log(value);
      }, error => {
        console.log(error);
      });
    }
  }

}
