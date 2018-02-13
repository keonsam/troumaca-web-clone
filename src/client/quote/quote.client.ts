import {Observable} from "rxjs/Observable";
import {QuoteState} from "./quote.state";

export abstract class QuoteClient {
  public abstract getQuotes():Observable<QuoteState>;
}