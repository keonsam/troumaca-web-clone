import {QuoteRepository} from '../../quotes/quote.repository';
import {Observable} from 'rxjs';
import {Quote} from '../../quotes/quote';
import {QuoteClient} from '../../client/quote/quote.client';

export class QuoteRepositoryAdapter implements QuoteRepository {

  constructor(private quoteClient: QuoteClient) {
  }

  getQuotes(): Observable<Quote> {
    return undefined;
  }

}
