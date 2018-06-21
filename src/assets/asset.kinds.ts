import {AssetKind} from './asset.kind';

export class AssetKinds {

  private _assetKinds: AssetKind[];

  get assetKinds(): AssetKind[] {
    return this._assetKinds;
  }

  set assetKinds(value: AssetKind[]) {
    this._assetKinds = value;
  }

}
