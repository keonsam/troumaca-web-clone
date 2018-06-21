import {Observable} from 'rxjs/Observable';
import {Quote} from './quote';

export abstract class QuoteRepository {
  public abstract getQuotes(): Observable<Quote>;
}
