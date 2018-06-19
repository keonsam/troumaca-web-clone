import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AssetTypeClassService} from '../asset.type.class.service';
import {AssetTypeClass} from '../asset.type.class';
import {ActivatedRoute} from '@angular/router';
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';

import {Router} from '@angular/router';
import {Attributes} from '../../attributes/attributes';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import {DataType} from '../../attributes/data.type';
import {Attribute} from '../../attributes/attribute';
import {AssignedAttribute} from '../assigned.attribute';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {UnitOfMeasure} from '../../unit-of-measure/unit.of.measure';


@Component({
  selector: 'asset-type-class-edit',
  templateUrl: './asset.type.class.edit.component.html',
  styleUrls: ['./asset.type.class.edit.component.css']
})
export class AssetTypeClassEditComponent implements OnInit {

  private assetTypeClassId: string;
  private sub: any;
  private _name: FormControl;
  private _description: FormControl;

  private _attributeName: FormControl;
  private _format: FormControl;
  private _dataType: FormControl;
  private _unitOfMeasureId: FormControl;
  private _maximumValue: FormControl;
  private _minimumValue: FormControl;

  private _unitOfMeasureIdDataService: CompleterData;

  private _assetTypeClassEditForm: FormGroup;
  private _attributeForm: FormGroup;

  private _assignedArray: string[];
  private _assignedAttributes: AssignedAttribute[];

  private attribute: Attribute;
  private _dataTypes: DataType[];

  private assetTypeClass: AssetTypeClass;
  private _availableAttributes: Attributes;
  private _assignAttributes: Attributes;

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
              private route: ActivatedRoute,
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

     this.assetTypeClassEditForm = formBuilder.group({
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

     this.assetTypeClass = new AssetTypeClass();

     const newAttribute = new Attribute();
     newAttribute.unitOfMeasure = new UnitOfMeasure();
     this.attribute = newAttribute;

     const newAttributes = new Attributes();
     newAttributes.page = new Page(0, 0, 0);
     newAttributes.sort = new Sort();
     this.availableAttributes = newAttributes;
     this.assignAttributes = newAttributes;

     this.assignedArray = [];
     this.assignedAttributes = [];

     this.dataTypes = [];

     this.doNotDisplayFailureMessage = true;

     this.doNotDisplayFailureMessage2 = true;

  }

  ngOnInit() {
    const that = this;
    this.assetTypeClassService
    .getDataTypes()
    .subscribe(dataTypes => {
      if (dataTypes) {
        that.dataTypes = dataTypes.dataTypes;
      }
    }, onError => {
      console.log(onError);
    });
    this.sub = this.route.params.subscribe(params => {
       this.assetTypeClassId = params['assetTypeClassId'];
       this.assetTypeClassService.getAssetTypeClass(this.assetTypeClassId)
       .subscribe(data => {
        this.name.setValue(data.assetTypeClass.name);
        this.description.setValue(data.assetTypeClass.description);
        this.assetTypeClass = data.assetTypeClass;
        this.assignedArray = data.assignedAttributes.map(x => x.attributeId);
        this.assignedAttributes = data.assignedAttributes;
        this.updateTable();
      }, error => {
        console.log(error);
      }, () => {
        this.assetTypeClassEditForm
        .valueChanges
        .subscribe(value => {
          this.assetTypeClass.name = value.name;
          this.assetTypeClass.description = value.description;
        }, error2 => {
          console.log(error2);
        });
      })
    });

    this.populateUnitOfMeasureIdDropDown();
  }

  private populateUnitOfMeasureIdDropDown() {
    this.findUnitOfMeasureId('');
    this.attributeForm.get('unitOfMeasureId').valueChanges
    //.debounceTime(1000) // debounce
      .filter(value => { // filter out empty values
        return !!(value);
      })
      .subscribe(value => {
        this.findUnitOfMeasureId(value);
      });
  }

  findUnitOfMeasureId(value) {
    this.assetTypeClassService
      .findUnitOfMeasureId(value, this.pageSize) // send search request to the backend
      .map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            unitOfMeasureId: v2.unitOfMeasureId,
            name: v2.name
          };
        })
      })
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

   get assetTypeClassEditForm(): FormGroup {
     return this._assetTypeClassEditForm;
   }

   set assetTypeClassEditForm(value: FormGroup) {
     this._assetTypeClassEditForm = value;
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

   get assignAttributes(): Attributes {
     return this._assignAttributes;
   }

   set assignAttributes(value: Attributes) {
     this._assignAttributes = value;
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

   isChecked(attributeId) {
    // weird error where isChecked get called when you removed an item for assignAttribute
     const isChecked = this.assignedAttributes.find(x => x.attributeId == attributeId);
     return isChecked ? isChecked.required : false;
   }

   onCheckBoxChange(event, attributeId) {
     this.assignedAttributes.find(x => x.attributeId == attributeId).required = event.target.checked;
   }

   getAvailableAttributes() {
     this.assetTypeClassService
     .getAvailableAttributes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder, this.assignedArray)
     .subscribe(next => {
       this.availableAttributes = next;
     }, error => {
       console.log(error);
     }, () => {
       console.log('complete');
     });
   }

   getAssignAttributes() {
     this.assetTypeClassService
     .getAssignAttributes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder, this.assignedArray)
     .subscribe(next => {
       this.assignAttributes = next;
     }, error => {
       console.log(error);
     }, () => {
       console.log('complete');
     });
   }

   updateTable() {
     this.getAssignAttributes();
     this.getAvailableAttributes();
   }

   onAvailableDoubleClick(attributeId: string, ) {
     this.assignedArray.push(attributeId);
     this.updateTable();
     // update and push to make sure no error
     this.assignedAttributes.push(new AssignedAttribute(attributeId));

   }

   onAssignedDoubleClick(attributeId: string) {
    this.assignedArray = this.assignedArray.filter(val => val != attributeId);
    this.updateTable();
    this.assignedAttributes = this.assignedAttributes.filter(val => val.attributeId != attributeId);
   }

   onOpenDeleteModal(attributeId: string, attributeName: string){
     this.attributeId = attributeId;
     this.attributeNameTwo = attributeName;
   }

   onOpenFormModal(attributeId: string){
     this.attributeId = attributeId;
     this.assetTypeClassService
     .getAttribute(attributeId)
     .subscribe(attribute => {
       this.attributeName.setValue(attribute.name);
       this.format.setValue(attribute.format);
       this.dataType.setValue(attribute.dataTypeId);
       this.unitOfMeasureId.setValue(attribute.unitOfMeasure.name);
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
     this.getAvailableAttributes();
 }

   onAssignedRequestPage(pageNumber: number) {
     this.defaultPage = pageNumber;
     this.getAssignAttributes();
   }

   onDelete() {
     this.assetTypeClassService
     .deleteAttribute(this.attributeId)
     .subscribe(value => {
     this.getAvailableAttributes();
     }, error => {
     console.log(error);
     }, () => {
     console.log('complete');
     });
   }

   onCreate() {
     this.doNotDisplayFailureMessage = true;
     this.assignedAttributes.forEach(value => {
       if (!value.assetTypeClassId) {
         value.assetTypeClassId = this.assetTypeClassId;
       }
     });
     this.assetTypeClassService
     .updateAssetTypeClass(this.assetTypeClassId, this.assetTypeClass, this.assignedAttributes)
     .subscribe(value => {
       if (value) {
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
     if (this.newOrEdit == 'New'){
       this.assetTypeClassService
       .addAttribute(this.attribute)
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
       .updateAttribute(this.attributeId, this.attribute)
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
}
