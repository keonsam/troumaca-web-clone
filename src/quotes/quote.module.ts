import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {PagingModule} from '../paging/paging.module';
import {QuoteComponent} from './quote.component';
import {QuoteService} from './quote.service';
import {QuoteRepository} from './quote.repository';
import {QuoteListComponent} from './quote-list/quote.list.component';
import {QuoteEditComponent} from './quote-edit/quote.list.component';
import {QuoteCreationComponent} from './quote-creation/quote.list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagingModule,
    MenuModule
  ],
  declarations: [
    QuoteComponent,
    QuoteListComponent,
    QuoteEditComponent,
    QuoteCreationComponent
  ],
  providers: [{
    provide: QuoteService,
    useFactory(quoteRepository: QuoteRepository) {
      let quoteService: QuoteService;
      if (!quoteService) {
        quoteService = new QuoteService(quoteRepository);
      }
      return quoteService;
    },
    deps: [QuoteRepository]
  }],
  exports: [
    QuoteComponent,
    QuoteListComponent,
    QuoteEditComponent,
    QuoteCreationComponent
  ]
})
export class QuoteModule {
}
