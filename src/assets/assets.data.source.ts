import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Asset} from './asset';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AssetService} from './asset.service';
import {OnDestroy, OnInit} from '@angular/core';

export class AssetsDataSource extends DataSource<Asset | undefined> implements OnInit, OnDestroy {
  cachedFacts = Array.from<Asset>({ length: 0 });
  private dataStream = new BehaviorSubject<(Asset | undefined)[]>(this.cachedFacts);
  private subscription = new Subscription();
  private pageSize = 8;
  private lastPage = 0;
  search: string;
  private _destroyed$ = new Subject();

  constructor(private assetService: AssetService, listSize: number) {
    super();
    this.pageSize = listSize;
    this.assetService.search
      .pipe(
        takeUntil(this._destroyed$)
      ).subscribe( value => {
        if (value !== null) {
          console.log('test');
          this.lastPage = 0;
          this.search = value;
          this.getAssets({search: this.search, new: true});
        }
    });
    this.getAssets({search: this.search, new: true});
  }

  ngOnInit(): void {
  }

  ngOnDestroy (): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  connect(collectionViewer: CollectionViewer): Observable<(Asset | undefined)[] | ReadonlyArray<Asset | undefined>> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      console.log('connect');
      console.log(range.end);
      console.log(this.lastPage);
      const currentPage = this._getPageForIndex(range.end);
      if (currentPage > this.lastPage) {
        this.lastPage = currentPage;
        this.getAssets({search: this.search, new: false});
      }
    }));
    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }

  setView(pageSize) {
    this.pageSize = pageSize;
    this.lastPage = 0;
    this.getAssets({search: this.search, new: true});
  }

  private getAssets(obj: {search: string, new: boolean }) {
    // console.log(obj);
    this.assetService.getAssets(obj.search, this.lastPage, this.pageSize)
      .pipe(
        takeUntil(this._destroyed$)
      )
      .subscribe( val => {
        // console.log(val);
        if (!obj.new) {
          this.cachedFacts = this.cachedFacts.concat(val.assets);
          this.dataStream.next(this.cachedFacts);
        } else {
          // this.cachedFacts = Array.from<Asset>({ length: 0 });
          this.cachedFacts = Array.from<Asset>({ length: 0 }).concat(val.assets);
          this.dataStream.next(this.cachedFacts);
        }
      }, error => {
        console.error(error);
      });
  }

  private _getPageForIndex(i: number): number {
    return Math.floor(i / this.pageSize);
  }
}
