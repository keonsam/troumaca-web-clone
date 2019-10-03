import {Component} from '@angular/core';
import {faChevronLeft, faChevronRight, faExclamationTriangle, faImage, faTag, faThLarge} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogPosition, MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AssetTypeSelectModalComponent} from '../asset-type/select-modal-component/asset.type.select.modal.component';
import {AssetType} from '../asset-type/asset.type';
import {Asset} from '../asset';
import {AssetService} from '../asset.service';

@Component({
  selector: 'app-asset-create-modal',
  templateUrl: './asset.create.modal.component.html',
  styleUrls: ['./asset.create.modal.component.css']
})
export class AssetCreateModalComponent {
  faImage = faImage;
  faThLarge = faThLarge;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faTag = faTag;
  name: FormControl;
  description: FormControl;
  assetForm: FormGroup;
  dialogRefTypes: MatDialogRef<AssetTypeSelectModalComponent>;
  faExclamationTriangle = faExclamationTriangle;
  assetType: AssetType;
  showDes = false;
  showImage = false;
  source = '../../css/images/assets-img';
  private asset: Asset;
  images: string[] = [
    `${this.source}/asset-2.png`, `${this.source}/asset-2.1.png`, `${this.source}/asset-2.2.png`,
    `${this.source}/asset-2.3.png`, `${this.source}/asset-2.4.png`, `${this.source}/asset-2.5.png`
  ];
  image: string;

  constructor(
    public dialogRef: MatDialogRef<AssetCreateModalComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private assetService: AssetService
  ) {
    this.asset = new Asset();
    this.name = new FormControl('', [Validators.required]);
    this.description = new FormControl('');

    this.assetForm = formBuilder.group({
      'name': this.name,
      'description': this.description
    });

    this.assetForm
      .valueChanges
      .subscribe( val => {
        this.asset.name = val.name;
        this.asset.description = val.description
      });
  }

  private openModal() {
    const dialogPosition: DialogPosition = {
      left: '418px'
    };
    this.dialogRefTypes = this.dialog.open(AssetTypeSelectModalComponent,  {
      height: '100%',
      width: '706px',
      position: dialogPosition,
      hasBackdrop: true,
      backdropClass: 'backdrop-left',
      closeOnNavigation: true,
      disableClose: false,
      panelClass: ['left-panel-2'],
    });
    this.dialogRefTypes.afterClosed().subscribe( (val: AssetType) => {
      if (val && val.assetTypeId) {
        this.assetType = val;
        this.asset.assetTypeId = val.assetTypeId;
      }
        this.dialogRefTypes = undefined;
    });
  }

  private closeSelectType() {
    this.dialogRefTypes.close();
  }

  openSelectType() {
    if (this.dialogRefTypes) {
      this.closeSelectType();
    } else {
      this.openModal();
    }
  }

  toggleDes() {
    this.showDes = !this.showDes;
  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  onImageSelect(image: string) {
    this.image = image;
    this.showImage = false;
    this.asset.image = image;
  }

  returnImage(image: string) {
    return `url(${image})`;
  }

  onSubmit() {
    this.assetService.addAsset(this.asset)
      .subscribe( value => {
        if (value && value.assetId) {
          this.dialogRef.close(true)
        }else {
          console.log('failed');
        }
      }, error => {
        console.log(error);
      });
  }
}
