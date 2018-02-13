import {Component} from "@angular/core";
import {Quotes} from "../quotes";

@Component({
  selector: 'quote-list',
  templateUrl:'./quote.list.component.html',
  styleUrls: ['./quote.list.component.css']
})
export class QuoteListComponent {

  private _quotes:Quotes;

  constructor() {
    this._quotes = new Quotes();
  }

  get quotes(): Quotes {
    return this._quotes;
  }

  set quotes(value: Quotes) {
    this._quotes = value;
  }

}