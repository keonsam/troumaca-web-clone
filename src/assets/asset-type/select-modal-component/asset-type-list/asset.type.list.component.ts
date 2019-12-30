import {Component, Input} from '@angular/core';
import {AssetType} from '../../asset.type';
import {IPageInfo} from 'ngx-virtual-scroller';
import {AssetTypeService} from '../../asset.type.service';

@Component({
  selector: 'app-asset-type-list',
  templateUrl: 'asset.type.list.component.html',
  styleUrls: ['asset.type.list.component.css']
})
export class AssetTypeListComponent {
  items: AssetType[];
  @Input() type: string;
  @Input() tab: string;
  lastPage = 0;
  pageSize = 10;


  trackByFn(index, item) {
    return item.assetTypeId;
  }

  onSelected(assetType: AssetType) {
  }

  getAssetTypesEvent(event: IPageInfo) {
    console.log(event);
  }
}
