// import {Component, OnInit} from '@angular/core';
// import {Page} from '../../page/page';
// import {Sort} from '../../sort/sort';
// import {MatDialog, PageEvent} from '@angular/material';
// import {AssetCharacteristics} from '../asset.characteristics';
// import {AssetCharacteristicService} from '../asset.characteristic.service';
// import {ActivatedRoute} from '@angular/router';
// import {ASSET_CHARACTERISTICS} from '../../app/routes';
// import {DeleteModalComponent} from '../../delete-modal/delete.modal.component';
//
// @Component({
//   selector: 'app-asset-characteristic-list',
//   templateUrl: './asset.characteristic.list.component.html',
//   styleUrls: ['./asset.characteristic.list.component.css']
// })
// export class AssetCharacteristicListComponent implements OnInit {
//
//
//   assetCharacteristicId: string;
//   assetCharacteristics: AssetCharacteristics;
//   private defaultPage = 1;
//   private defaultPageSize = 10;
//   private defaultSortOrder = 'asc';
//   assetCharacteristicName: string;
//   routerLink = `/${ASSET_CHARACTERISTICS}`;
//   newRoute = `/${this.routerLink}/create`;
//
//   constructor(private assetCharacteristicService: AssetCharacteristicService,
//               private route: ActivatedRoute,
//               public dialog: MatDialog) {
//     const assetCharacteristics = new AssetCharacteristics();
//     assetCharacteristics.page = new Page(0, 0, 0);
//     assetCharacteristics.sort = new Sort();
//     this.assetCharacteristics = assetCharacteristics;
//   }
//
//   ngOnInit(): void {
//     if (this.route.snapshot && this.route.snapshot.data['assetCharacteristics']) {
//       this.assetCharacteristics = this.route.snapshot.data['assetCharacteristics'];
//     }
//   }
//
//   private getAssetCharacteristics() {
//     this.assetCharacteristicService.getAssetCharacteristics(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
//       .subscribe(next => {
//         this.assetCharacteristics = next;
//       }, error => {
//         console.log(error);
//       }, () => {
//         console.log('complete');
//       });
//   }
//
//
//   onOpenModal(assetCharacteristicId: string, assetCharacteristicName: string) {
//     this.assetCharacteristicId = assetCharacteristicId;
//     this.assetCharacteristicName = assetCharacteristicName;
//     const dialogRef = this.dialog.open(DeleteModalComponent, {
//       maxWidth: '300px',
//       data: {name: this.assetCharacteristicName}
//     });
//
//     dialogRef.afterClosed().subscribe(result => {
//       console.log(result);
//       if (result) {
//         this.onDelete(result);
//       }
//     });
//   }
//
//   onDelete(deleted: boolean) {
//     if (deleted) {
//       this.assetCharacteristicService
//         .deleteAssetCharacteristic(this.assetCharacteristicId)
//         .subscribe(value => {
//           if (value) {
//             this.getAssetCharacteristics();
//           }
//         }, error => {
//           console.log(error);
//         }, () => {
//           console.log('complete');
//         });
//     }
//   }
//
//
//   onRequestPage(pageEvent: PageEvent) {
//     this.defaultPage = pageEvent.pageIndex + 1;
//     this.defaultPageSize = pageEvent.pageSize;
//     this.getAssetCharacteristics();
//   }
// }
