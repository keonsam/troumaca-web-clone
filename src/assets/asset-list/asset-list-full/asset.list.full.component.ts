import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Asset} from '../../asset';
import {IPageInfo} from 'ngx-virtual-scroller';
import {AssetService} from '../../asset.service';
import {DialogPosition, MatDialog} from '@angular/material/dialog';
import {AssetCreateModalComponent} from '../../asset-create-modal/asset.create.modal.component';
import {DeleteModalComponent} from '../../../dashboard/delete-modal/delete.modal.component';
import {DashboardLayoutService} from '../../../dashboard/dashboard.layout.service';
import {SuccessMessage} from '../../../dashboard/success-message/success.message';

@Component({
  selector: 'app-asset-list-full',
  templateUrl: 'asset.list.full.component.html',
  styleUrls: ['asset.list.full.component.css']
})
export class AssetListFullComponent {
  @Input() listType: string;
  @Input() assets: Asset[] = [];
  @Output() getAssetsEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() remove: EventEmitter<number> = new EventEmitter<number>( null);
  @Output() edit: EventEmitter<{index: number, asset: Asset}> = new EventEmitter<{index: number, asset: Asset}>( null);
  lastPage: number;
  pageSize = 10;
  selected: string;

  constructor(private assetService: AssetService,
              private dashboardLayoutService: DashboardLayoutService,
              public dialog: MatDialog,
              ) {
    this.assetService.lastPage
      .subscribe( value => {
        this.lastPage = value;
      });
  }

  trackByFn(index, item) {
    if (item) {
      return item.assetId;
    } else {
      return undefined;
    }
  }

  getAssets(event: IPageInfo) {
    const currentPage = this._getPageForIndex(event.endIndex);
    if (currentPage > this.lastPage) {
      this.assetService.lastPage.next(currentPage);
      this.getAssetsEvent.emit(true);
    }
  }

  handleDetails(id: string) {
    this.selected = id;
    // this.openAssetDetails(id);
  }

  private openAsset(assetId: string, type: string, dialogPosition: DialogPosition, i: number) {
    const dialogRef = this.dialog.open(AssetCreateModalComponent,  {
      data: { type, assetId },
      height: '100%',
      position: dialogPosition,
      hasBackdrop: true,
      backdropClass: 'backdrop',
      closeOnNavigation: true,
      disableClose: false,
      panelClass: ['left-panel'],
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && type === 'edit') {
        this.edit.emit({index: i, asset: result});
      }
    });
  }

  handleEdit(assetId: string, i: number) {
    const dialogPosition: DialogPosition = {
      top: '0',
      left: '0'
    };
    this.openAsset(assetId, 'edit', dialogPosition, i)
  }

  handleDelete(assetId: string, image: string, name: string, i: number) {
    const dialogRef = this.dialog.open(DeleteModalComponent,  {
      data: { type: 'asset', image, name },
      width: '415px',
      height: '311px',
      hasBackdrop: true,
      backdropClass: 'backdrop-blue',
      closeOnNavigation: true,
      disableClose: false,
      panelClass: ['delete-panel'],
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAsset(assetId, name, i);
      }
    });
  }

  private deleteAsset(assetId: string, name: string, i: number) {
    this.assetService.deleteAsset(assetId)
      .subscribe(value => {
        if (value) {
          this.dashboardLayoutService.success.next(new SuccessMessage('asset', name , true, 'deleted'));
          this.remove.emit(i);
        }else {
          this.dashboardLayoutService.error.next(true);
        }
      }, error => {
        this.dashboardLayoutService.error.next(true);
        console.error(error);
      });
  }

  private _getPageForIndex(i: number): number {
    return Math.floor((i + 1) / this.pageSize);
  }
}
