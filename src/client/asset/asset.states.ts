import {AssetState} from "./asset.state";
import {PageState} from "../page/page.state";
import {SortState} from "../sort/sort.state";
import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class AssetStates {

  private _assets:AssetState[];
  private _page:PageState;
  private _sort:SortState;

  @JsonProperty("assets", [AssetState])
  get assets(): AssetState[] {
    return this._assets;
  }

  set assets(value: AssetState[]) {
    this._assets = value;
  }

  get page(): PageState {
    return this._page;
  }

  set page(value: PageState) {
    this._page = value;
  }

  get sort(): SortState {
    return this._sort;
  }

  set sort(value: SortState) {
    this._sort = value;
  }

}