import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AssetTypeClassService} from '../asset.type.class.service';
import {AssetTypeClass} from '../asset.type.class';
import {ActivatedRoute} from '@angular/router';

import {Router} from '@angular/router';
import {Attributes} from '../../attributes/attributes';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import {AssignedAttribute} from '../assigned.attribute';
import {AssetTypeClassResponse} from '../asset.type.class.response';
import {AttributeService} from '../../attributes/attribute.service';

@Component({
  selector: 'app-asset-type-class-form',
  templateUrl: './asset.type.class.form.component.html',
  styleUrls: ['./asset.type.class.form.component.css']
})
export class AssetTypeClassFormComponent implements OnInit {

  private _name: FormControl;
  private _description: FormControl;

  private _assetTypeClassForm: FormGroup;

  private _assignedAttributes: AssignedAttribute[];

  private assetTypeClass: AssetTypeClass;
  private _availableAttributes: Attributes;
  private _assignableAttributes: Attributes;

  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';

  public attributeId: string;

  private _doNotDisplayFailureMessage: boolean;
  private assignedArray: string[];
  private assignedPageNumber = 1;

  public assetTypeClassExist = false;
  public attributeName: string;
  public modalType: string;
  public getAssignedPage: Page;
  @ViewChild('modelClose') modelClose: ElementRef;


  constructor(private assetTypeClassService: AssetTypeClassService,
              private attributeService: AttributeService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

     this.name = new FormControl('', Validators.required);
     this.description = new FormControl('');

     this.assetTypeClassForm = formBuilder.group({
        'name': this.name,
        'description': this.description
     });

    this.assetTypeClassForm
      .valueChanges
      .subscribe(value => {
        this.assetTypeClass.name = value.name;
        this.assetTypeClass.description = value.description;
      }, error2 => {
        console.log(error2);
      });

     this.assetTypeClass = new AssetTypeClass();

     const newAttributes = new Attributes();
     newAttributes.page = new Page(0, 0, 0);
     newAttributes.sort = new Sort();
     this.availableAttributes = newAttributes;
     this.assignableAttributes = newAttributes;

     this.assignedAttributes = [];
     this.assignedArray = [];

     this.doNotDisplayFailureMessage = true;
  }

  ngOnInit() {
    if (this.route.snapshot && this.route.snapshot.data['assetTypeClassResponse']) {
      this.setInputValues(this.route.snapshot.data['assetTypeClassResponse']);
      this.getAvailableAttributes(this.assignedArray);
    }else {
      this.getAvailableAttributes(this.assignedArray);
    }
  }

  private setInputValues(assetTypeClassResponse: AssetTypeClassResponse) {
    this.name.setValue(assetTypeClassResponse.assetTypeClass.name);
    this.description.setValue(assetTypeClassResponse.assetTypeClass.description);
    this.assetTypeClass = assetTypeClassResponse.assetTypeClass;
    this.assignedAttributes = assetTypeClassResponse.assignedAttributes;
    this.assignedArray = this.assignedAttributes.map(x => x.attributeId);
    this.setAssignedPage();
    this.assetTypeClassExist = true;
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

  onModalOpen(type: string, attributeId?: string) {
    this.modalType = type;
    this.attributeId = attributeId;
  }

  doCloseModal(closed: boolean) {
    if (closed) {
      this.getAvailableAttributes(this.assignedArray);
      this.modelClose.nativeElement.click();
    }
  }

   private getAvailableAttributes(assignedAttributes) {
     this.assetTypeClassService
       .getAvailableAttributes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder, assignedAttributes)
       .subscribe(attributes => {
         this.availableAttributes = attributes;
       });
   }

   onAvailableDoubleClick(attributeId: string, attributeName, dataTypeName ) {
     this.assignedAttributes.push(new AssignedAttribute(attributeId, attributeName, dataTypeName));
     this.assignedArray.push(attributeId);
     this.setAssignedPage();
     this.getAvailableAttributes(this.assignedArray);
   }

   onAssignedDoubleClick(attributeId: string) {
    this.assignedAttributes = this.assignedAttributes.filter(val => val.attributeId !== attributeId);
    this.assignedArray = this.assignedArray.filter( x => x !== attributeId);
    this.setAssignedPage();
    this.getAvailableAttributes(this.assignedArray);
   }

  onOpenDeleteModal(attributeId: string, attributeName: string) {
     this.attributeId = attributeId;
     this.attributeName = attributeName;
   }

  onDelete(deleted: boolean) {
    if (deleted) {
      this.attributeService
        .deleteAttribute(this.attributeId)
        .subscribe(value => {
          if (value) {
            this.getAvailableAttributes(this.assignedArray);
          }
        }, error => {
          console.log(error);
        }, () => {
          console.log('complete');
        });
    }
  }

  setAssignedPage() {
    const page: Page = new Page();
    page.number = this.assignedPageNumber;
    page.size = this.defaultPageSize;
    page.items = this.assignedPageNumber < 2 ? this.assignedAttributes.length : (this.assignedPageNumber - 1) * this.defaultPageSize + 1;
    page.totalItems = this.assignedAttributes.length;
    this.getAssignedPage = page;
  }

  onAvailableRequestPage(pageNumber: number) {
    this.defaultPage = pageNumber;
    this.getAvailableAttributes(this.assignedArray);
  }

  getSlice() {
    if (this.assignedPageNumber < 2) {
      return this.assignedAttributes.slice(0, 11);
    }else {
      const begin = (this.assignedPageNumber - 1) * this.defaultPageSize + 1;
      const end = (this.assignedPageNumber - 1) * this.defaultPageSize + 11;
      return this.assignedAttributes.slice(begin, end);
    }
  }

   onAssignedRequestPage(pageNumber: number) {
     this.assignedPageNumber = pageNumber;
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

   onUpdate() {
     this.doNotDisplayFailureMessage = true;
     this.assignedAttributes.forEach(value => {
       if (!value.assetTypeClassId) {
         value.assetTypeClassId = this.assetTypeClass.assetTypeClassId;
       }
     });
     this.assetTypeClassService
     .updateAssetTypeClass(this.assetTypeClass.assetTypeClassId, this.assetTypeClass, this.assignedAttributes)
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

   cancel() {
     this.router.navigate(['/asset-type-classes']);
   }
}
