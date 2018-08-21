import {Observable} from 'rxjs';
import {AssetPersons} from './asset.persons';

export abstract class AssetPersonRepository {

  public abstract findPersons(searchStr: string, pageSize: number): Observable<AssetPersons>;

}
