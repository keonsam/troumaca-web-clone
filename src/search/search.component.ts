import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private _searchText:string;
  private _visible:boolean;

  constructor() {
    this.visible = true;
  }

  ngOnInit(): void {
  }

  onEnter(value: string) {
    this.searchText = value;
    console.log(value);
  }

  onKeyUp(value: string) {
    this.searchText = value;
    console.log(value);
  }

  get searchText() {
    return this._searchText;
  }

  set searchText(value) {
    this._searchText = value;
  }

  get visible(): boolean {
    return this._visible;
  }

  @Input()
  set visible(value: boolean) {
    this._visible = value;
  }

}