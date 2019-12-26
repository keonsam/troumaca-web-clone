import {Component} from '@angular/core';
import {faFilter, faList, faSortAmountDown, faTh} from '@fortawesome/free-solid-svg-icons';
import {AssetService} from '../asset.service';

@Component({
  selector: 'app-asset-sort',
  templateUrl: 'asset.sort.component.html',
  styleUrls: ['asset.sort.component.css']
})
export class AssetSortComponent {
  faFilter = faFilter;
  faSortAmountDown = faSortAmountDown;
  faList = faList;
  faTh = faTh;
  listType = localStorage.getItem('defaultList') || 'list';
  constructor(private assetService: AssetService) { }
  switchList(type: string) {
    this.listType = type;
    localStorage.setItem('defaultList', type);
    this.assetService.listType.next(type);
  }
}
