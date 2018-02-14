import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
//import {CompleterService} from "ng2-completer";
import {AssetTypeService} from "../asset.type.service";
import {AssetType} from "../../assets/asset.type";
import {Router} from "@angular/router";
import {AssetTypeClasses} from "../../assets/asset.type.classes";

@Component({
  selector: 'asset-type-creation',
  templateUrl: './asset.type.creation.component.html',
  styleUrls: ['./asset.type.creation.component.css']
})
export class AssetTypeCreationComponent implements OnInit {

  private _assetTypeClassId: FormControl;
  private _name: FormControl;
  private _description: FormControl;
  private _modelNumber: FormControl;
  private _materielCode: FormControl;
  private _unitOfMeasureId: FormControl;

  private _assetTypeForm:FormGroup;

  private assetType: AssetType;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private assetTypeService:AssetTypeService,
              private formBuilder: FormBuilder,
              private router: Router) {

      this.assetTypeClassId = new FormControl("", Validators.required);
      this.name = new FormControl("", Validators.required);
      this.description = new FormControl("");
      this.modelNumber = new FormControl("");
      this.materialCode = new FormControl("");
      this.unitOfMeasureId = new FormControl("");

      this.assetTypeForm = formBuilder.group({
        "assetTypeClassId": this.assetTypeClassId,
        "name": this.name,
        "description": this.description,
        "modelNumber": this.modelNumber,
        "materialCode": this.materialCode,
        "unitOfMeasureId": this.unitOfMeasureId
      });

    let assetType = new AssetType();
    assetType.assetTypeClass = new AssetTypeClasses();
    this.assetType = assetType;

    this.assetTypeForm
    .valueChanges
    .subscribe(value => {
      this.assetType.assetTypeClass = new AssetTypeClasses(value.assetTypeClassId);
      this.assetType.name = value.name;
      this.assetType.description = value.description;
      this.assetType.modelNumber = value.modelNumber;
      this.assetType.materialCode = value.materialCode;
      this.assetType.unitOfMeasureId = value.unitOfMeasureId;
      console.log(value);
    }, error2 => {
      console.log(error2);
    });

    this.doNotDisplayFailureMessage = true;

  }

  ngOnInit(): void {

  }

  get assetTypeClassId(): FormControl {
    return this._assetTypeClassId;
  }

  set assetTypeClassId(value: FormControl) {
    this._assetTypeClassId = value;
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

  get modelNumber(): FormControl {
    return this._modelNumber;
  }

  set modelNumber(value: FormControl) {
    this._modelNumber = value;
  }

  get materialCode(): FormControl {
    return this._materielCode;
  }

  set materialCode(value: FormControl) {
    this._materielCode = value;
  }

  get unitOfMeasureId(): FormControl {
    return this._unitOfMeasureId;
  }

  set unitOfMeasureId(value: FormControl) {
    this._unitOfMeasureId = value;
  }

  get assetTypeForm(): FormGroup {
    return this._assetTypeForm;
  }

  set assetTypeForm(value: FormGroup) {
    this._assetTypeForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  onCreate() {
    console.log(this.assetType);
    this.doNotDisplayFailureMessage = true;
    this.assetTypeService
    .addAssetType(this.assetType)
    .subscribe(value => {
      if (value && value.assetTypeId) {
        this.router.navigate(['/asset-types']);
      } else {
        this.doNotDisplayFailureMessage = false;
      }
    }, error => {
      console.log(error);
      this.doNotDisplayFailureMessage = false;
    });
  }

  cancel() {
    this.router.navigate(['/asset-types']);
  }

}
