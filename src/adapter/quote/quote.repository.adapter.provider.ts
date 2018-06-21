import {QuoteRepositoryAdapter} from './quote.repository.adapter';
import {QuoteRepository} from '../../quotes/quote.repository';
import {QuoteClient} from '../../client/quote/quote.client';

export function quoteRepositoryProviderFactory (quoteClient: QuoteClient): QuoteRepository {
  let quoteRepositoryAdapter: QuoteRepositoryAdapter;
  if (!quoteRepositoryAdapter) {
    quoteRepositoryAdapter = new QuoteRepositoryAdapter(quoteClient);
  }
  return quoteRepositoryAdapter;
}

export let quoteRepositoryProvider = {
  provide: QuoteRepository,
  useFactory: quoteRepositoryProviderFactory,
  deps: [QuoteClient]
};
