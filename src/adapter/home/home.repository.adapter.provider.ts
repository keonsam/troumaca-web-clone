import {HomeClient} from "../../client/home/home.client";
import {HomeRepository} from "../../home/home.repository";
import {HomeRepositoryAdapter} from "./home.repository.adapter";

export function homeRepositoryProviderFactory (homeClient: HomeClient): HomeRepository {
  let homeRepositoryAdapter: HomeRepositoryAdapter;
  if (!homeRepositoryAdapter) {
    homeRepositoryAdapter = new HomeRepositoryAdapter(homeClient);
  }
  return homeRepositoryAdapter;
}

export let homeRepositoryProvider = {
  provide: HomeRepository,
  useFactory: homeRepositoryProviderFactory,
  deps: [HomeClient]
};
