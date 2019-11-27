import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogPosition, MatDialog, MatDialogRef} from '@angular/material';
import {AttributeSelectModalComponent} from '../../attributes/attributes-select-modal-component/attribute.select.modal.component';
import {attributeFont} from '../../attributes/attribute.font';
import {AssetType} from '../asset.type';
import {AssetTypeService} from '../asset.type.service';
import {SelectedAttribute} from "../../attributes/selected.attribute";
import {Characteristic} from "../characteristic";

@Component({
  selector: 'app-asset-type-create-modal',
  templateUrl: './asset.type.create.modal.component.html',
  styleUrls: ['././asset.type.create.modal.component.css']
})
export class AssetTypeCreateModalComponent {

  attributes: SelectedAttribute[] = [];
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
  private _items: FormArray;

  constructor(
    public dialogRef: MatDialogRef<AssetTypeCreateModalComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private assetTypeService: AssetTypeService
  ) {
    this.assetType = new AssetType();
    this.assetType.color = this.color;
    this.name = new FormControl('', [Validators.required]);
    this.description = new FormControl('');
    this.share = new FormControl(false);
    this.use = new FormControl(false);

    this.assetTypeForm = formBuilder.group({
      'name': this.name,
      'description': this.description,
      'share': this.share,
      'use': this.use,
      'items': formBuilder.array([ ])
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

  createItem(attribute: SelectedAttribute) {
    return this.formBuilder.group({
      assetCharacteristicId: attribute.assetCharacteristicId,
      assetCharacteristicTypeId: attribute.assetCharacteristicTypeId,
      name: attribute.name,
      required: attribute.required,
      preFilled: attribute.preFilled,
      description: attribute.description,
      preFilledValue: new FormControl(attribute.preFilledValue, attribute.required ? [Validators.required]: null),
      list: attribute.list
    });
  }

  addItem(attribute: SelectedAttribute): void {
    this._items = this.assetTypeForm.get('items') as FormArray;
    this._items.push(this.createItem(attribute));
  }

  newAttributeModal() {
    const dialogPosition: DialogPosition = {
      bottom: '0',
      left: '418px'
    };
    const dialogRef = this.dialog.open(AttributeSelectModalComponent,  {
      height: '100%',
      width: '706px',
      position: dialogPosition,
      hasBackdrop: true,
      backdropClass: 'backdrop-left',
      closeOnNavigation: true,
      disableClose: false,
      panelClass: ['left-panel-2'],
    });

    dialogRef.afterClosed().subscribe((values: SelectedAttribute[]) => {
      if (values) {
        values.forEach( (val: SelectedAttribute) => {
          this.addItem(val);
        })
      }
    });
  }

  onSubmit() {
    this.assetType.characteristics = this.assetTypeForm.get('items').value.map( (val: SelectedAttribute) => {
      return new Characteristic(val.assetCharacteristicId, val.preFilled, val.preFilledValue, val.required).toJSON();
    });
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
