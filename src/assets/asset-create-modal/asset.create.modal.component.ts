import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogPosition, MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AssetTypeSelectModalComponent} from '../asset-type/select-modal-component/asset.type.select.modal.component';
import {AssetType} from '../asset-type/asset.type';
import {Asset} from '../asset';
import {AssetService} from '../asset.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-asset-create-modal',
  templateUrl: './asset.create.modal.component.html',
  styleUrls: ['./asset.create.modal.component.css']
})
export class AssetCreateModalComponent implements OnInit, OnDestroy {
  name: FormControl;
  description: FormControl;
  assetForm: FormGroup;
  dialogRefTypes: MatDialogRef<AssetTypeSelectModalComponent>;
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
  private _destroyed$ = new Subject();

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
      .pipe(
        takeUntil(this._destroyed$)
      )
      .subscribe( val => {
        this.asset.name = val.name;
        this.asset.description = val.description
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy (): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  private openModal() {
    const dialogPosition: DialogPosition = {
      left: '418px'
    };
    this.dialogRefTypes = this.dialog.open(AssetTypeSelectModalComponent,  {
      height: '100%',
      // position: dialogPosition,
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

  // private closeSelectType() {
  //   this.dialogRefTypes.close();
  // }

  openSelectType() {
    if (!this.dialogRefTypes) {
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
    console.log(this.asset);
    this.assetService.addAsset(this.asset)
      .pipe(
        takeUntil(this._destroyed$)
      )
      .subscribe( value => {
        if (value && value.assetId) {
          this.dialogRef.close(true)
        }else {
          console.error('failed');
        }
      }, error => {
        console.error(error);
      });
  }
}
