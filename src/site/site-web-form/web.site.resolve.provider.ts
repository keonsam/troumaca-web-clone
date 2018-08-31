import { SiteService } from "../site.service";
import { WebSiteResolve} from "./web.site.resolve";

export function webSiteResolveProviderFactory (siteService: SiteService): WebSiteResolve {
  let webSiteResolve: WebSiteResolve;
  if (!webSiteResolve) {
    webSiteResolve = new WebSiteResolve(siteService);
  }
  return webSiteResolve;
}

export let webSiteResolveProvider = {
  provide: WebSiteResolve,
  useFactory: webSiteResolveProviderFactory,
  deps: [SiteService]
};
