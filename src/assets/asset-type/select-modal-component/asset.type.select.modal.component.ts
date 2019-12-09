import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogPosition, MatDialog, MatDialogRef} from '@angular/material';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {AssetTypeCreateModalComponent} from '../create-modal-component/asset.type.create.modal.component';
import {AssetType} from '../asset.type';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {AssetTypeService} from '../asset.type.service';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {AssetTypes} from '../asset.types';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-asset-type-select-modal',
  templateUrl: './asset.type.select.modal.component.html',
  styleUrls: ['././asset.type.select.modal.component.css']
})
export class AssetTypeSelectModalComponent implements OnInit, OnDestroy {

  search: FormControl;
  faSearch = faSearch;
  assetTypes: AssetTypes = new AssetTypes();
  private _tab: string;
  private _searchStr: string;
  private _destroyed$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<AssetTypeSelectModalComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private assetTypeService: AssetTypeService
  ) {
    this._tab = 'All';
    this._searchStr = '';
    this.search = new FormControl('');
  }

  ngOnInit(): void {
    this.getAssetTypes(this._tab, this._searchStr);
    this.subscribeToSearch();
  }

  ngOnDestroy (): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  trackByFn(index, item) {
    return item.assetTypeId;
  }

  private getAssetTypes(tab?: string, search?: string) {
    this.assetTypeService.getAssetTypes(tab, search)
      .pipe(
        takeUntil(this._destroyed$)
      )
      .subscribe( val => {
        if (val) {
          this.assetTypes = val;
        }else {
          console.error('failed');
        }
      }, error => {
        console.error(error);
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
        this._searchStr = val;
        this.getAssetTypes(this._tab, this._searchStr);
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
      panelClass: ['left-panel-2', 'left-panel-3'],
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAssetTypes(this._tab, this._searchStr);
      }
    });
  }

  tabChange(event: MatTabChangeEvent) {
    this._tab = event.tab.textLabel;
    this.getAssetTypes(this._tab, this._searchStr);
  }

  onSelected(assetType: AssetType) {
    this.dialogRef.close(assetType);
  }
}
