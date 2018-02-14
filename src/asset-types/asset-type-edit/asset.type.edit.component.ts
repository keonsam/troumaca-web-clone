import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
//import {CompleterService} from "ng2-completer";
import {AssetTypeService} from "../asset.type.service";
import {AssetType} from "../../assets/asset.type";
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";
import {AssetTypeClasses} from "../../assets/asset.type.classes";

@Component({
  selector: 'asset-type-edit',
  templateUrl: './asset.type.edit.component.html',
  styleUrls: ['./asset.type.edit.component.css']
})
export class AssetTypeEditComponent implements OnInit {

  private assetTypeId: string;
  private sub: any;
  private _assetTypeClassId: FormControl;
  private _name: FormControl;
  private _description: FormControl;
  private _modelNumber: FormControl;
  private _materielCode: FormControl;
  private _unitOfMeasureId: FormControl;

  private _assetTypeEditForm:FormGroup;

  private assetType: AssetType;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private assetTypeService:AssetTypeService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

      this.assetTypeClassId = new FormControl("", Validators.required);
      this.name = new FormControl("", Validators.required);
      this.description = new FormControl("");
      this.modelNumber = new FormControl("");
      this.materialCode = new FormControl("");
      this.unitOfMeasureId = new FormControl("");

      this.assetTypeEditForm = formBuilder.group({
        "assetTypeClassId": this.assetTypeClassId,
        "name": this.name,
        "description": this.description,
        "modelNumber": this.modelNumber,
        "materialCode": this.materialCode,
        "unitOfMeasureId": this.unitOfMeasureId
      });

      this.assetTypeEditForm
      .valueChanges
      .subscribe(value => {
       this.setAssetTypeValue(value);
        console.log(value);
      }, error2 => {
        console.log(error2);
      });

    let assetType = new AssetType();
    assetType.assetTypeClass = new AssetTypeClasses();
    this.assetType = assetType;

    this.doNotDisplayFailureMessage = true;

  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
       this.assetTypeId = params['assetTypeId'];
       this.assetTypeService.getAssetType(this.assetTypeId)
       .subscribe(assetType =>{
        this.assetTypeClassId.setValue(assetType.assetTypeClass.assetTypeClassId);
        this.name.setValue(assetType.name);
        this.description.setValue(assetType.description);
        this.modelNumber.setValue(assetType.modelNumber);
        this.materialCode.setValue(assetType.materialCode);
        this.unitOfMeasureId.setValue(assetType.unitOfMeasureId);
        this.assetType = assetType;
      }, error => {
        console.log(error);
      }, () => {
        this.assetTypeEditForm
        .valueChanges
        .subscribe(value => {
          this.setAssetTypeValue(value);
          console.log(value);
        }, error2 => {
          console.log(error2);
        });
      })
    });

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

  get assetTypeEditForm(): FormGroup {
    return this._assetTypeEditForm;
  }

  set assetTypeEditForm(value: FormGroup) {
    this._assetTypeEditForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  setAssetTypeValue(value) {
    this.assetType.assetTypeClass = new AssetTypeClasses(value.assetTypeClassId);
    this.assetType.name = value.name;
    this.assetType.description = value.description;
    this.assetType.modelNumber = value.modelNumber;
    this.assetType.materialCode = value.materialCode;
    this.assetType.unitOfMeasureId = value.unitOfMeasureId;
  }

  onCreate() {
    console.log(this.assetType);
    this.doNotDisplayFailureMessage = true;
    this.assetTypeService
    .updateAssetType(this.assetTypeId,this.assetType)
    .subscribe(value => {
      console.log(value);
      if (value) {
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
