import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogPosition, MatDialog, MatDialogRef} from '@angular/material';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {AssetTypeCreateModalComponent} from '../create-modal-component/asset.type.create.modal.component';
import {AssetType} from '../asset.type';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {AssetTypeService} from '../asset.type.service';

@Component({
  selector: 'app-asset-type-select-modal',
  templateUrl: './asset.type.select.modal.component.html',
  styleUrls: ['././asset.type.select.modal.component.css']
})
export class AssetTypeSelectModalComponent implements OnInit {

  search: FormControl;
  faSearch = faSearch;
  assetTypes: AssetType[];
  constructor(
    public dialogRef: MatDialogRef<AssetTypeSelectModalComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private assetTypeService: AssetTypeService
  ) {
    this.search = new FormControl('');
  }

  ngOnInit(): void {
    this.getAssetTypes();
    this.subscribeToSearch();
  }

  private getAssetTypes(search?: string) {
    this.assetTypeService.getAssetTypes(search)
      .subscribe( val => {
        if (val && val.assetTypes.length >= 1) {
          this.assetTypes = val.assetTypes;
        }else {
          console.log('failed');
        }
      }, error => {
        console.log(error);
      });
  }

  private subscribeToSearch() {
    this.search
      .valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe( val => {
        this.getAssetTypes(val);
      });
  }

  openCreateNew() {
    const dialogPosition: DialogPosition = {
      bottom: '0',
      left: '418px'
    };
    const dialogRef = this.dialog.open(AssetTypeCreateModalComponent,  {
      height: 'calc(100% - 48px)',
      width: '706px',
      position: dialogPosition,
      hasBackdrop: true,
      backdropClass: 'backdrop-left',
      closeOnNavigation: true,
      disableClose: false,
      panelClass: ['left-panel-2'],
    })
  }

  onSelected(assetType: AssetType) {
    this.dialogRef.close(assetType);
  }
}
