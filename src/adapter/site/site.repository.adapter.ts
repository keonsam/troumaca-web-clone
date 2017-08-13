import "rxjs/add/operator/map";
import {SiteClient} from "../../client/site/site.client";
import {SiteRepository} from "../../site/site.repository";

export class SiteRepositoryAdapter extends SiteRepository {
  constructor(private siteClient: SiteClient) {
    super();
  }
}