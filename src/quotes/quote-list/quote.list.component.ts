import {Component} from '@angular/core';
import {Quotes} from '../quotes';

@Component({
  selector: 'quote-list',
  templateUrl: './quote.list.component.html',
  styleUrls: ['./quote.list.component.css']
})
export class QuoteListComponent {

  private _routerLinkCreateQuote: string;
  private _quotes: Quotes;

  constructor() {
    this.routerLinkCreateQuote = '/quotes/create';
    this._quotes = new Quotes();
  }

  get routerLinkCreateQuote(): string {
    return this._routerLinkCreateQuote;
  }

  set routerLinkCreateQuote(value: string) {
    this._routerLinkCreateQuote = value;
  }

  get quotes(): Quotes {
    return this._quotes;
  }

  set quotes(value: Quotes) {
    this._quotes = value;
  }

  onRequestPage(event: any) {
    console.log('not implemented');
  }

}
