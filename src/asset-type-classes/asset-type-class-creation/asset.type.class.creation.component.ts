import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {AssetTypeClassService} from '../asset.type.class.service';
import {AssetTypeClass} from '../asset.type.class';
import {Router} from '@angular/router';
import {Attributes} from '../../attributes/attributes';
import {AssignedAttribute} from '../assigned.attribute';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import {DataType} from '../../attributes/data.type';
import {Attribute} from '../../attributes/attribute';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {map, filter } from "rxjs/operators";

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

  private _unitOfMeasureIdDataService: CompleterData;

  private _assetTypeClassForm: FormGroup;
  private _attributeForm: FormGroup;

  private _assignedArray: string[];
  private _assignedAttributes: AssignedAttribute[];

  private attribute: Attribute;
  private _dataTypes: DataType[];

  private assetTypeClass: AssetTypeClass;
  private _availableAttributes: Attributes;
  private _assignableAttributes: Attributes;

  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';

  private attributeId: string;

  private _doNotDisplayFailureMessage: boolean;
  private _doNotDisplayFailureMessage2: boolean;

  private _newOrEdit: string;
  private modalReference: NgbModalRef;
  private pageSize = 15;
  private _attributeNameTwo: string;

  constructor(private assetTypeClassService: AssetTypeClassService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private router: Router) {

    this.name = new FormControl('', Validators.required);
    this.description = new FormControl('');

    this.attributeName = new FormControl('', [Validators.required]);

    this.format = new FormControl('');

    this.dataType = new FormControl('', [Validators.required]);

    this.unitOfMeasureId = new FormControl('');

    this.maximumValue = new FormControl('');

    this.minimumValue = new FormControl('');

   this.assetTypeClassForm = formBuilder.group({
      'name': this.name,
      'description': this.description
    });

    this.attributeForm = formBuilder.group({
      'attributeName': this.attributeName,
      'format': this.format,
      'dataType': this.dataType,
      'unitOfMeasureId': this.unitOfMeasureId,
      'maximumValue': this.maximumValue,
      'minimumValue': this.minimumValue
    });


    this.assetTypeClass = new AssetTypeClass();

    this.attribute = new Attribute();

    const newAttributes = new Attributes();
    newAttributes.page = new Page(0, 0, 0);
    newAttributes.sort = new Sort();
    this.availableAttributes = newAttributes;
    this.assignableAttributes = newAttributes;

    this.assetTypeClassForm
    .valueChanges
    .subscribe(value => {
      this.assetTypeClass.name = value.name;
      this.assetTypeClass.description = value.description;
    }, error2 => {
      console.log(error2);
    });

    this.attributeForm
    .valueChanges
    .subscribe(value => {
      this.attribute.name = value.attributeName;
      this.attribute.format = value.format;
      this.attribute.dataTypeId = value.dataType;
      this.attribute.maximumValue = value.maximumValue;
      this.attribute.minimumValue = value.minimumValue;
    }, error2 => {
      console.log(error2);
    });

    this.assignedArray = [];
    this.assignedAttributes = [];

    this.dataTypes = [];

    this.doNotDisplayFailureMessage = true;

    this.doNotDisplayFailureMessage2 = true;

  }

  ngOnInit(): void {

    const that = this;
    this.assetTypeClassService
    .getDataTypes()
    .subscribe(dataTypes => {
      if (dataTypes) {
        that.dataTypes = dataTypes;
        this.getAssignableAttributes(this.assignedArray, 'available');
      }
    }, onError => {
      console.log(onError);
    });

    this.populateUnitOfMeasureIdDropDown();
  }

  private populateUnitOfMeasureIdDropDown() {
    this.findUnitOfMeasureId('');
    this.attributeForm.get('unitOfMeasureId').valueChanges
    //.debounceTime(1000) // debounce
      .pipe(filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findUnitOfMeasureId(value);
      });
  }

  findUnitOfMeasureId(value) {
    this.assetTypeClassService
      .findUnitOfMeasureId(value, this.pageSize) // send search request to the backend
      .pipe(map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            unitOfMeasureId: v2.unitOfMeasureId,
            name: v2.name
          };
        })
      }))
      .subscribe(next => { // update the data
        this.unitOfMeasureIdDataService = this.completerService.local(next, 'name', 'name');
      }, error => {
        console.log('finUnitOfMeasureId error - ' + error);
      });
  }

  get attributeNameTwo(): string {
    return this._attributeNameTwo;
  }

  set attributeNameTwo(value: string) {
    this._attributeNameTwo = value;
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

  get unitOfMeasureIdDataService(): CompleterData {
    return this._unitOfMeasureIdDataService;
  }

  set unitOfMeasureIdDataService(value: CompleterData) {
    this._unitOfMeasureIdDataService = value;
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

  get availableAttributes(): Attributes {
    return this._availableAttributes;
  }

  set availableAttributes(value: Attributes) {
    this._availableAttributes = value;
  }

  get assignableAttributes(): Attributes {
    return this._assignableAttributes;
  }

  set assignableAttributes(value: Attributes) {
    this._assignableAttributes = value;
  }

  get assignedArray(): string[] {
    return this._assignedArray;
  }

  set assignedArray(value: string[]) {
    this._assignedArray = value;
  }

  get assignedAttributes(): AssignedAttribute[] {
    return this._assignedAttributes;
  }

  set assignedAttributes(value: AssignedAttribute[]) {
    this._assignedAttributes = value;
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

  getDataType(dataTypeId: string) {
    const index = this.dataTypes.findIndex( x => x.dataTypeId === dataTypeId);
    if (index === -1 ) {
      return '';
    }
    return this.dataTypes[index].name;
  }

  onUnitOfMeasureIdSelect(selected: CompleterItem) {
    if (selected) {
      this.attribute.unitOfMeasureId = selected.originalObject.unitOfMeasureId;
    }
  }

  getAssignableAttributes(assignedArray, type) {
    this.assetTypeClassService
    .getAssignableAttributes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder, assignedArray, type)
    .subscribe(next => {
      if (type === 'available') {
        this.availableAttributes = next;
      }else {
        this.assignableAttributes = next
      }
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });
  }

  updateTable(assignedArray: string[]) {
    this.getAssignableAttributes(assignedArray, 'available');
    this.getAssignableAttributes(assignedArray, 'assignable');
  }


  onCheckBoxChange(event, attributeId) {
    this.assignedAttributes.find(x => x.attributeId === attributeId).required = event.target.checked;
  }

  onAvailableDoubleClick(attributeId: string) {
   this.assignedArray.push(attributeId);
   this.updateTable(this.assignedArray);
    // update and push to make sure no error
    this.assignedAttributes.push(new AssignedAttribute(attributeId));
  }

  onAssignedDoubleClick(attributeId: string) {
  this.assignedArray = this.assignedArray.filter(val => val !== attributeId);
    this.updateTable(this.assignedArray);
    this.assignedAttributes = this.assignedAttributes.filter(val => val.attributeId !== attributeId);
  }

  isChecked(attributeId) {
    // weird error where isChecked get called when you removed an item for assignAttribute
    const isChecked = this.assignedAttributes.find(x => x.attributeId === attributeId);
    return isChecked ? isChecked.required : false;
  }

  onOpenDeleteModal(attributeId: string, attributeName) {
    this.attributeId = attributeId;
    this.attributeNameTwo = attributeName;
  }

  onOpenFormModal(attributeId: string) {
    this.attributeId = attributeId;
    this.assetTypeClassService
    .getAttribute(attributeId)
    .subscribe(attribute => {
      this.attributeName.setValue(attribute.name);
      this.format.setValue(attribute.format);
      this.dataType.setValue(attribute.dataTypeId);
      this.unitOfMeasureId.setValue(attribute.unitOfMeasureName);
      this.maximumValue.setValue(attribute.maximumValue);
      this.minimumValue.setValue(attribute.minimumValue);
      this.attribute = attribute;
   }, error => {
     console.log(error);
   }, () => {
     console.log('complete');
   });
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {windowClass: 'lgModal', size: 'lg'});
    this.modalReference.result.then((result) => {
    }, (reason) => {
      if (reason === ModalDismissReasons.BACKDROP_CLICK || ModalDismissReasons.ESC) {
      this.onResetForm();
    }
   });
  }

  onNewOrEdit(value: string) {
    this.newOrEdit = value;
  }

  onAvailableRequestPage(pageNumber: number) {
    this.defaultPage = pageNumber;
    this.getAssignableAttributes(this.assignedArray, 'available');
}

  onAssignedRequestPage(pageNumber: number) {
    this.defaultPage = pageNumber;
    this.getAssignableAttributes(this.assignedArray, 'assignable');
  }

  onDelete() {
    this.assetTypeClassService
    .deleteAttribute(this.attributeId)
    .subscribe(value => {
    this.getAssignableAttributes(this.assignedArray, 'available');
    }, error => {
    console.log(error);
    }, () => {
    console.log('complete');
    });
  }

  addAttribute(attribute: Attribute) {
    this.assetTypeClassService
      .addAttribute(attribute)
      .subscribe(value => {
        if (value && value.attributeId) {
          this.onResetForm();
          this.getAssignableAttributes(this.assignedArray, 'available');
          this.modalReference.close();
        } else {
          this.doNotDisplayFailureMessage2 = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage2 = false;
      });
  }

  updateAttribute(attributeId: string, attribute: Attribute) {
    this.assetTypeClassService
      .updateAttribute(attributeId, attribute)
      .subscribe(value => {
        if (value) {
          this.onResetForm();
          this.getAssignableAttributes(this.assignedArray, 'available');
          this.modalReference.close()
        } else {
          this.doNotDisplayFailureMessage2 = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage2 = false;
      });
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.assetTypeClassService
    .addAssetTypeClass(this.assetTypeClass, this.assignedAttributes)
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
    // TODO : remove newOrEdit and use attribute.attributeId
    if (this.newOrEdit === 'New') {
      this.addAttribute(this.attribute);
    } else {
      this.updateAttribute(this.attributeId, this.attribute);
    }
  }

  onResetForm() {
    this.attribute = new Attribute();
    this.attributeForm.reset();
  }

  cancel() {
    this.router.navigate(['/asset-type-classes']);
  }

}
