import {Component} from '@angular/core';
import {AssetService} from '../../asset.service';

@Component({
  selector: 'app-asset-list-empty',
  templateUrl: 'asset.list.empty.component.html',
  styleUrls: ['asset.list.empty.component.css']
})
export class AssetListEmptyComponent {
  constructor(private assetService: AssetService) {
  }

  openAssetCreate() {
    this.assetService.onNewAsset.next(true);
  }
}
