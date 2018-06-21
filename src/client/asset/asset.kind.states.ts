import {AssetKindState} from './asset.kind.state';

export class AssetKindStates {

  private _assetKinds: AssetKindState[];

  get assetKinds(): AssetKindState[] {
    return this._assetKinds;
  }

  set assetKinds(assetKinds: AssetKindState[]) {
    this._assetKinds = assetKinds;
  }
}
