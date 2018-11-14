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
import {AttributeService} from '../../attributes/attribute.service';

@Component({
  selector: 'app-asset-type-class-form',
  templateUrl: './asset.type.class.form.component.html',
  styleUrls: ['./asset.type.class.form.component.css']
})
export class AssetTypeClassFormComponent implements OnInit {

  name: FormControl;
  description: FormControl;

  assetTypeClassForm: FormGroup;

  assignedAttributes: AssignedAttribute[];

  private assetTypeClass: AssetTypeClass;
  availableAttributes: Attributes;
  assignableAttributes: Attributes;

  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';

  public attributeId: string;

  doNotDisplayFailureMessage: boolean;
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
      this.getAvailableAttributes();
      this.getAssignableAttributes();
    } else {
      this.getAvailableAttributes();
      this.getAssignableAttributes();
    }
  }

  private setInputValues(assetTypeClass: AssetTypeClass) {
    this.name.setValue(assetTypeClass.name);
    this.description.setValue(assetTypeClass.description);
    this.assetTypeClass = assetTypeClass;
    this.assignedAttributes = assetTypeClass.assignedAttributes;
    this.assignedArray = assetTypeClass.assignedAttributes.map(x => x.attributeId);
    this.assetTypeClassExist = true;
  }

  private getAvailableAttributes() {
    this.assetTypeClassService
      .getAvailableAttributes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder, this.assignedArray)
      .subscribe(attributes => {
        this.availableAttributes = attributes;
      });
  }

  private getAssignableAttributes() {
    this.assetTypeClassService
      .getAssignableAttributes(this.assignedPageNumber, this.defaultPageSize, this.defaultSortOrder, this.assignedArray)
      .subscribe(attributes => {
        this.assignableAttributes = attributes;
      });
  }

  getChecked(attributeId: string) {
    const attr = this.assignedAttributes.find(x => x.attributeId === attributeId);
    return attr ? attr.required : false;
  }

  onChange(attributeId: string) {
    const index = this.assignedAttributes.findIndex(x => x.attributeId === attributeId);
    this.assignedAttributes[index].required = !this.assignedAttributes[index].required;
  }

  onAvailableDoubleClick(attributeId: string) {
    this.assignedAttributes.push(new AssignedAttribute(attributeId));
    this.assignedArray.push(attributeId);
    this.getAvailableAttributes();
    this.getAssignableAttributes();
  }

  onAssignedDoubleClick(attributeId: string) {
    this.assignedAttributes = this.assignedAttributes.filter(val => val.attributeId !== attributeId);
    this.assignedArray = this.assignedArray.filter(x => x !== attributeId);
    this.getAvailableAttributes();
    this.getAssignableAttributes();
  }

  onModalOpen(type: string, attributeId?: string) {
    this.modalType = type;
    this.attributeId = attributeId;
  }

  doCloseModal(closed: boolean) {
    if (closed) {
      this.getAvailableAttributes();
      this.modelClose.nativeElement.click();
    }
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
            this.getAvailableAttributes();
          }
        }, error => {
          console.log(error);
        }, () => {
          console.log('complete');
        });
    }
  }

  onAvailableRequestPage(pageNumber: number) {
    this.defaultPage = pageNumber;
    this.getAvailableAttributes();
  }

  onAssignedRequestPage(pageNumber: number) {
    this.assignedPageNumber = pageNumber;
    this.getAssignableAttributes();
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
