import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogPosition, MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AssetTypeSelectModalComponent} from '../asset-type/select-modal-component/asset.type.select.modal.component';
import {AssetType} from '../asset-type/asset.type';
import {Asset} from '../asset';
import {AssetService} from '../asset.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {DashboardLayoutService} from '../../dashboard/dashboard.layout.service';
import {SuccessMessage} from '../../dashboard/success-message/success.message';

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
  showDes = false;
  showImage = false;
  source = '../../css/images/assets-img';
  private asset: Asset;
  type: string;
  images: string[] = [
    `${this.source}/asset-2.png`, `${this.source}/asset-2.1.png`, `${this.source}/asset-2.2.png`,
    `${this.source}/asset-2.3.png`, `${this.source}/asset-2.4.png`, `${this.source}/asset-2.5.png`
  ];
  image: string;
  private _destroyed$ = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { type: string, assetId: string },
    public dialogRef: MatDialogRef<AssetCreateModalComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private assetService: AssetService,
    private dashboardLayoutService: DashboardLayoutService
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

    // this.dashboardLayoutService.successNext
    //   .pipe(
    //     takeUntil(this._destroyed$)
    //   )
    //   .subscribe(value => {
    //     if (value) {
    //       this.dialogRef.close(true);
    //     }
    //   });
  }

  ngOnInit(): void {
    if (this.data) {
      this.getAssetById(this.data.assetId);
    }
  }

  ngOnDestroy (): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  private getAssetById(assetId: string) {
    this.assetService.getAssetById(assetId)
      .subscribe( val => {
        if (val && val.assetId) {
          this.name.setValue(val.name);
          this.description.setValue(val.description);
          this.asset = val;
        }
      });
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
        this.asset.assetTypeId = val.assetTypeId;
        this.asset.assetType = val;
      }
        this.dialogRefTypes = undefined;
    });
  }


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
    this.assetService.addAsset(this.asset)
      .pipe(
        takeUntil(this._destroyed$)
      )
      .subscribe( value => {
        if (value && value.assetId) {
          this.dialogRef.close(true);
          this.dashboardLayoutService.success.next(new SuccessMessage('asset', this.asset.name, true, 'created'));
        }else {
          console.error('failed');
        }
      }, error => {
        console.error(error);
      });
  }

  onEdit() {
    this.assetService.updateAsset(this.data.assetId, this.asset)
      .subscribe( value => {
        if (value) {
          this.dialogRef.close(this.asset);
          this.dashboardLayoutService.success.next(new SuccessMessage('asset', this.asset.name, true, 'updated'));
        } else {
          this.dashboardLayoutService.error.next(true);
        }
      }, error => {
        this.dashboardLayoutService.error.next(true);
        console.error(error);
      });
  }
}
