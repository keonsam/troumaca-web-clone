import {QuoteClient} from './quote.client';
import {Observable} from 'rxjs';
import {QuoteState} from './quote.state';
import {HttpClient} from '@angular/common/http';
import {UUIDGenerator} from '../../uuid.generator';

export class QuoteClientHttp extends QuoteClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
    super();
  }

  public getQuotes(): Observable<QuoteState> {
    return undefined;
  }

}
