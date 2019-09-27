import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogPosition, MatDialog, MatDialogRef} from '@angular/material';
import {faChevronDown, faChevronUp, faExclamationTriangle, faSearch, faTag} from '@fortawesome/free-solid-svg-icons';
import {AttributeSelectModalComponent} from '../../attributes/attributes-select-modal-component/attribute.select.modal.component';
import {Attribute} from '../../attributes/attribute';
import {attributeFont} from '../../attributes/attribute.font';
import {AssetType} from '../asset.type';
import {AssetTypeService} from '../asset.type.service';

@Component({
  selector: 'app-asset-type-create-modal',
  templateUrl: './asset.type.create.modal.component.html',
  styleUrls: ['././asset.type.create.modal.component.css']
})
export class AssetTypeCreateModalComponent {


  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faExclamationTriangle = faExclamationTriangle;
  faTag = faTag;
  attributes: Attribute[] = [];
  name: FormControl;
  description: FormControl;
  share: FormControl;
  use: FormControl;
  assetTypeForm: FormGroup;
  assetType: AssetType;
  colors: string[] = [
    '#F2CBCB', '#CBEDF2', '#CCF1DD',
    '#CCD8F1', '#E7CCF1', '#F0F1CC'
  ];
  color = '#F2CBCB';
  showColors = false;

  constructor(
    public dialogRef: MatDialogRef<AssetTypeCreateModalComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private assetTypeService: AssetTypeService
  ) {
    this.assetType = new AssetType();
    this.name = new FormControl('', [Validators.required]);
    this.description = new FormControl('');
    this.share = new FormControl(false);
    this.use = new FormControl(false);

    this.assetTypeForm = formBuilder.group({
      'name': this.name,
      'description': this.description,
      'share': this.share,
      'use': this.use
    });

    this.assetTypeForm
      .valueChanges
      .subscribe(value => {
        this.assetType.name = value.name;
        this.assetType.description = value.description;
        this.assetType.share = value.share;
        this.assetType.use = value.use
      })
  }

  newAttributeModal() {
    const dialogPosition: DialogPosition = {
      bottom: '0',
      left: '418px'
    };
    const dialogRef = this.dialog.open(AttributeSelectModalComponent,  {
      height: 'calc(100% - 96px)',
      width: '706px',
      position: dialogPosition,
      hasBackdrop: true,
      backdropClass: 'backdrop-left',
      closeOnNavigation: true,
      disableClose: false,
      panelClass: ['left-panel-2'],
    });

    dialogRef.afterClosed().subscribe(values => {
      if (values) {
        this.attributes = values;
        this.assetType.attribute = values;
      }
    });
  }

  getIcon(id: string) {
    return attributeFont(id);
  }

  onSubmit() {
    this.assetTypeService.saveAssetType(this.assetType)
      .subscribe( val => {
        if (val && val.assetTypeId) {
          this.dialogRef.close(true)
        }else {
          console.log('failed')
        }
      }, error => {
        console.log(error);
      });
  }

  onSelectedColor(color: string) {
    this.showColors = false;
    this.color = color;
    this.assetType.color = color;
  }

  togglePop() {
    this.showColors = !this.showColors;
  }
}
