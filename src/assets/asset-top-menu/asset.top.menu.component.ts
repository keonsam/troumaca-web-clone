import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {faBox, faCheck, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {DialogPosition} from '@angular/material/dialog';
import {AssetCreateModalComponent} from '../asset-create-modal/asset.create.modal.component';
import {AssetService} from '../asset.service';
import {Target} from '@angular/compiler';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-asset-top-menu',
  templateUrl: 'asset.top.menu.component.html',
  styleUrls: ['asset.top.menu.component.css']
})
export class AssetTopMenuComponent implements OnInit, OnDestroy {
  faBox = faBox;
  faSearch = faSearch;
  faCheck = faCheck;
  search: FormControl;
  show = false;
  offsetLeft: string;
  offsetTop: string;
  private _destroyed$ = new Subject();

  constructor(private assetService: AssetService) {
    this.search = new FormControl();
  }

  ngOnInit(): void {
    this.subscribeToSearch()
  }

  ngOnDestroy (): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  private subscribeToSearch() {
    this.search
      .valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this._destroyed$)
      )
      .subscribe( val => {
        this.assetService.search.next(val);
      });
  }

  openAssetCreate() {
    this.assetService.onNewAsset.next(true);
  }

  openAssetTypeCreate() {
    this.assetService.onNewAssetType.next(true);
  }

  showModal(event: any) {
    this.offsetLeft = event.target.offsetLeft;
    this.offsetTop = event.target.offsetTop;
    this.show = true;
  }

  closeShow() {
    this.show = false;
  }

  handleButtons(num: number) {
    this.closeShow();
    if (num === 1) {
      this.openAssetCreate();
    }
    if (num === 2) {
      this.openAssetTypeCreate();
    }
  }
}
