import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faBox, faCheck, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {DialogPosition} from '@angular/material/dialog';
import {AssetCreateModalComponent} from '../asset-create-modal/asset.create.modal.component';
import {AssetService} from '../asset.service';

@Component({
  selector: 'app-asset-top-menu',
  templateUrl: 'asset.top.menu.component.html',
  styleUrls: ['asset.top.menu.component.css']
})
export class AssetTopMenuComponent implements OnInit {
  faBox = faBox;
  faSearch = faSearch;
  faCheck = faCheck;
  search: FormControl;
  constructor(private assetService: AssetService) {
    this.search = new FormControl();
  }

  ngOnInit(): void {
    this.subscribeToSearch()
  }

  private subscribeToSearch() {
    this.search
      .valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe( val => {
      });
  }

  openAssetCreate() {
    this.assetService.onNewAsset.next(true);
  }
}
