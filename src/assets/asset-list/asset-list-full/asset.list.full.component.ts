import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Asset} from '../../asset';
import {IPageInfo} from 'ngx-virtual-scroller';

@Component({
  selector: 'app-asset-list-full',
  templateUrl: 'asset.list.full.component.html',
  styleUrls: ['asset.list.full.component.css']
})
export class AssetListFullComponent {
  @Input() listType: string;
  @Input() assets: Asset[] = [];
  @Output() getAssetsEvent: EventEmitter<number> = new EventEmitter();
  lastPage = 0;
  pageSize = 10;

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
      this.lastPage = currentPage;
      this.getAssetsEvent.emit(this.lastPage);
    }
  }

  handleDetails(id: string) {
  }

  private _getPageForIndex(i: number): number {
    return Math.floor((i + 1) / this.pageSize);
  }
}
