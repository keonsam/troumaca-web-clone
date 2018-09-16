import {Observable} from 'rxjs';
import {Quote} from './quote';
import {QuoteRepository} from './quote.repository';

export class QuoteService {

  constructor(private quoteRepository: QuoteRepository) {
  }

  public getQuotes(): Observable<Quote> {
    return this.quoteRepository.getQuotes();
  }
}
