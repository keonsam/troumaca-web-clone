import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
//import {CompleterService} from "ng2-completer";
import {AssetTypeClassService} from "../asset.type.class.service";
import {AssetTypeClass} from "../asset.type.class";
import {Router} from "@angular/router";
import {Attributes} from "../../attributes/attributes";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";
import {DataType} from "../../attributes/data.type";
import {Attribute} from "../../attributes/attribute";
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'asset-type-class-creation',
  templateUrl: './asset.type.class.creation.component.html',
  styleUrls: ['./asset.type.class.creation.component.css']
})
export class AssetTypeClassCreationComponent implements OnInit {

  private _name: FormControl;
  private _description: FormControl;

  private _attributeName: FormControl;
  private _format: FormControl;
  private _dataType: FormControl;
  private _unitOfMeasureId: FormControl;
  private _maximumValue: FormControl;
  private _minimumValue: FormControl;

  /*private _attributeNameEdit: FormControl;
  private _formatEdit: FormControl;
  private _dataTypeEdit: FormControl;
  private _unitOfMeasureIdEdit: FormControl;
  private _maximumValueEdit: FormControl;
  private _minimumValueEdit: FormControl; */

  private _assetTypeClassForm:FormGroup;
  private _attributeForm: FormGroup;
  //private _attributeEditForm: FormGroup;

  private _assignedArray: string[];

  private attribute: Attribute;
  private _dataTypes: DataType[];

  private assetTypeClass: AssetTypeClass;
  private _availableAttributes: Attributes;
  private _assignedAttributes: Attributes;

  private defaultPage:number = 1;
  private defaultPageSize:number = 10;
  private defaultSortOrder = "asc";

  private attributeId: string;

  private _doNotDisplayFailureMessage:boolean;
  private _doNotDisplayFailureMessage2:boolean;
  //private _doNotDisplayFailureMessage3:boolean;

  private _newOrEdit: string;
  private modalReference: NgbModalRef;

  constructor(private assetTypeClassService:AssetTypeClassService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private router: Router) {

    this.name = new FormControl("", Validators.required);
    this.description = new FormControl("");

    this.attributeName = new FormControl("", [Validators.required]);

    this.format = new FormControl("");

    this.dataType = new FormControl("",[Validators.required]);

    this.unitOfMeasureId = new FormControl("");

    this.maximumValue = new FormControl("");

    this.minimumValue = new FormControl("");

    /*this.attributeNameEdit = new FormControl("", [Validators.required]);

    this.formatEdit = new FormControl("");

    this.dataTypeEdit = new FormControl("",[Validators.required]);

    this.unitOfMeasureIdEdit = new FormControl("");

    this.maximumValueEdit = new FormControl("");

    this.minimumValueEdit = new FormControl(""); */

   this.assetTypeClassForm = formBuilder.group({
      "name": this.name,
      "description": this.description
    });

    this.attributeForm = formBuilder.group({
      "attributeName": this.attributeName,
      "format": this.format,
      "dataType": this.dataType,
      "unitOfMeasureId": this.unitOfMeasureId,
      "maximumValue": this.maximumValue,
      "minimumValue": this.minimumValue
    });

    /*this.attributeEditForm = formBuilder.group({
      "attributeNameEdit": this.attributeNameEdit,
      "formatEdit": this.formatEdit,
      "dataTypeEdit": this.dataTypeEdit,
      "unitOfMeasureIdEdit": this.unitOfMeasureIdEdit,
      "maximumValueEdit": this.maximumValueEdit,
      "minimumValueEdit": this.minimumValueEdit
    }); */

    this.assetTypeClass = new AssetTypeClass();

    this.attribute = new Attribute();

    let newAttributes = new Attributes();
    newAttributes.page = new Page(0, 0, 0);
    newAttributes.sort = new Sort();
    this.availableAttributes = newAttributes;
    this.assignedAttributes = newAttributes;

    this.assetTypeClassForm
    .valueChanges
    .subscribe(value => {
      this.assetTypeClass.name = value.name;
      this.assetTypeClass.description = value.description;
      console.log(value);
    }, error2 => {
      console.log(error2);
    });

    this.attributeForm
    .valueChanges
    .subscribe(value => {
      this.attribute.name = value.attributeName;
      this.attribute.format = value.format;
      this.attribute.dataType = value.dataType;
      this.attribute.unitOfMeasureId = value.unitOfMeasureId;
      this.attribute.maximumValue = value.maximumValue;
      this.attribute.minimumValue = value.minimumValue;
      console.log(value);
    }, error2 => {
      console.log(error2);
    });

    /*this.attributeEditForm
    .valueChanges
    .subscribe(value => {
      this.attribute.name = value.attributeNameEdit;
      this.attribute.format = value.formatEdit;
      this.attribute.dataType = value.dataTypeEdit;
      this.attribute.unitOfMeasureId = value.unitOfMeasureIdEdit;
      this.attribute.maximumValue = value.maximumValueEdit;
      this.attribute.minimumValue = value.minimumValueEdit;
      console.log(value);
    }, error2 => {
      console.log(error2);
    }); */

    this.assignedArray = [];

    this.dataTypes = [];

    this.doNotDisplayFailureMessage = true;

    this.doNotDisplayFailureMessage2 = true;

    //this.doNotDisplayFailureMessage3 = true;
  }

  ngOnInit(): void {
    this.getAvailableAttributes();
    let that = this;
    this.assetTypeClassService
    .getDataTypes()
    .subscribe(dataTypes => {
      if (dataTypes) {
        that.dataTypes = dataTypes.dataTypes;
      }
    }, onError => {
      console.log(onError);
    });
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

  get attributeName(): FormControl {
    return this._attributeName;
  }

  set attributeName(value: FormControl) {
    this._attributeName = value;
  }

  get format(): FormControl {
    return this._format;
  }

  set format(value: FormControl) {
    this._format = value;
  }

  get dataType(): FormControl {
    return this._dataType;
  }

  set dataType(value: FormControl) {
    this._dataType = value;
  }

  get dataTypes(): DataType[] {
    return this._dataTypes;
  }

  set dataTypes(value: DataType[]) {
    this._dataTypes = value;
  }

  get unitOfMeasureId(): FormControl {
    return this._unitOfMeasureId;
  }

  set unitOfMeasureId(value: FormControl) {
    this._unitOfMeasureId = value;
  }

  get maximumValue(): FormControl {
    return this._maximumValue;
  }

  set maximumValue(value: FormControl) {
    this._maximumValue = value;
  }

  get minimumValue(): FormControl {
    return this._minimumValue;
  }

  set minimumValue(value: FormControl) {
    this._minimumValue = value;
  }

  /*get attributeNameEdit(): FormControl {
    return this._attributeNameEdit;
  }

  set attributeNameEdit(value: FormControl) {
    this._attributeNameEdit = value;
  }

  get formatEdit(): FormControl {
    return this._formatEdit;
  }

  set formatEdit(value: FormControl) {
    this._formatEdit = value;
  }

  get dataTypeEdit(): FormControl {
    return this._dataTypeEdit;
  }

  set dataTypeEdit(value: FormControl) {
    this._dataTypeEdit = value;
  }

  get unitOfMeasureIdEdit(): FormControl {
    return this._unitOfMeasureIdEdit;
  }

  set unitOfMeasureIdEdit(value: FormControl) {
    this._unitOfMeasureIdEdit = value;
  }

  get maximumValueEdit(): FormControl {
    return this._maximumValueEdit;
  }

  set maximumValueEdit(value: FormControl) {
    this._maximumValueEdit = value;
  }

  get minimumValueEdit(): FormControl {
    return this._minimumValueEdit;
  }

  set minimumValueEdit(value: FormControl) {
     this._minimumValueEdit = value;
  } */

  get assetTypeClassForm(): FormGroup {
    return this._assetTypeClassForm;
  }

  set assetTypeClassForm(value: FormGroup) {
    this._assetTypeClassForm = value;
  }

  get attributeForm(): FormGroup {
    return this._attributeForm;
  }

  set attributeForm(value: FormGroup) {
    this._attributeForm = value;
  }

  /*get attributeEditForm(): FormGroup {
    return this._attributeEditForm;
  }

  set attributeEditForm(value: FormGroup) {
    this._attributeEditForm = value;
  } */

  get availableAttributes(): Attributes {
    return this._availableAttributes;
  }

  set availableAttributes(value: Attributes) {
    this._availableAttributes = value;
  }

  get assignedAttributes(): Attributes {
    return this._assignedAttributes;
  }

  set assignedAttributes(value: Attributes) {
    this._assignedAttributes = value;
  }

  get assignedArray() : string[] {
    return this._assignedArray;
  }

  set assignedArray(value: string[]) {
    this._assignedArray = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  get doNotDisplayFailureMessage2(): boolean {
    return this._doNotDisplayFailureMessage2;
  }

  set doNotDisplayFailureMessage2(value: boolean) {
    this._doNotDisplayFailureMessage2 = value;
  }

  get newOrEdit(): string {
    return this._newOrEdit;
  }

  set newOrEdit(value: string) {
    this._newOrEdit = value;
  }

  /*get doNotDisplayFailureMessage3(): boolean {
    return this._doNotDisplayFailureMessage3;
  }

  set doNotDisplayFailureMessage3(value: boolean) {
    this._doNotDisplayFailureMessage3 = value;
  } */

  getAvailableAttributes() {
    this.assetTypeClassService
    .getAvailableAttributes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder, this.assignedArray)
    .subscribe(next => {
      console.log(next);
      this.availableAttributes = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log("complete");
    });
  }

  getAssignedAttributes() {
    this.assetTypeClassService
    .getAssignedAttributes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder, this.assignedArray)
    .subscribe(next => {
      this.assignedAttributes = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log("complete");
    });
  }

  updateTable() {
    this.getAssignedAttributes();
    this.getAvailableAttributes();
  }

  onAvailableDoubleClick(attributeId: string) {
   this.assignedArray.push(attributeId);
   this.updateTable();
  }

  onAssignedDoubleClick(attributeId: string) {
  this.assignedArray = this.assignedArray.filter(val => val != attributeId);
  this.updateTable();
  }

  onOpenDeleteModal(attributeId: string){
    this.attributeId = attributeId;
  }

  onOpenFormModal(attributeId: string){
    this.attributeId = attributeId;
    this.assetTypeClassService
    .getAvailableAttribute(attributeId)
    .subscribe(attribute =>{
      this.attributeName.setValue(attribute.name);
      this.format.setValue(attribute.format);
      this.dataType.setValue(attribute.dataType);
      this.unitOfMeasureId.setValue(attribute.unitOfMeasureId);
      this.maximumValue.setValue(attribute.maximumValue);
      this.minimumValue.setValue(attribute.minimumValue);
      this.attribute = attribute;
   }, error => {
     console.log(error);
   }, () => {
     console.log("complete");
   });

  }

  open(content) {
    this.modalReference = this.modalService.open(content, {windowClass: "lgModal", size: 'lg'});
    this.modalReference.result.then((result) => {
    }, (reason) => {
      if(reason === ModalDismissReasons.BACKDROP_CLICK || ModalDismissReasons.ESC) {
      this.onResetForm();
    }
   });
  }

  onNewOrEdit(value: string) {
    this.newOrEdit = value;
  }

  onAvailableRequestPage(pageNumber: number) {
    this.defaultPage = pageNumber;
    this.getAvailableAttributes();
}

  onAssignedRequestPage(pageNumber: number) {
    this.defaultPage = pageNumber;
    this.getAssignedAttributes();
  }

  onDelete() {
    this.assetTypeClassService
    .deleteAvailableAttribute(this.attributeId)
    .subscribe(value => {
    this.getAvailableAttributes();
    }, error => {
    console.log(error);
    }, () => {
    console.log("complete");
    });
  }

  onCreate() {

    this.assetTypeClass.assignedAttributes = this.assignedArray;
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

  onCreate2() {
    this.doNotDisplayFailureMessage2 = true;
    if(this.newOrEdit == "New"){
      this.assetTypeClassService
      .addAvailableAttribute(this.attribute)
      .subscribe(value => {
        if (value && value.attributeId) {
          this.onResetForm();
          this.getAvailableAttributes();
          this.modalReference.close();
        } else {
          this.doNotDisplayFailureMessage2 = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage2 = false;
      });
    }else{
      this.assetTypeClassService
      .updateAvailableAttribute(this.attributeId, this.attribute)
      .subscribe(value => {
        if (value) {
          this.onResetForm();
          this.getAvailableAttributes();
          this.modalReference.close()
        } else {
          this.doNotDisplayFailureMessage2 = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage2 = false;
      });
  }
  }

  onResetForm() {
    this.attribute = new Attribute();
    this.attributeForm.reset();
  }

  cancel() {
    this.router.navigate(['/asset-type-classes']);
  }

  /* onCreate3() {
    this.doNotDisplayFailureMessage3 = true;

  } */

}
