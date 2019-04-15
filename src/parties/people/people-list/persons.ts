import {Page} from '../../../page/page';
import {Sort} from '../../../sort/sort';
import {Person} from '../people-form/person';

export class Persons {
  persons: Person[] = [];
  page: Page;
  sort: Sort;
}
