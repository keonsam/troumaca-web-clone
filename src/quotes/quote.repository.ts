import {Observable} from 'rxjs';
import {Quote} from './quote';

export abstract class QuoteRepository {
  public abstract getQuotes(): Observable<Quote>;
}
