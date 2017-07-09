import {MenuClient} from "../../client/menu/menu.client";
import {MenuRepositoryAdapter} from "./menu.repository.adapter";
import {MenuRepository} from "../../menu/menu.repository";

export function menuRepositoryProviderFactory (menuClient:MenuClient):MenuRepository {
  let menuRepositoryAdapter: MenuRepositoryAdapter;
  if (!menuRepositoryAdapter) {
    menuRepositoryAdapter = new MenuRepositoryAdapter(menuClient);
  }
  return menuRepositoryAdapter;
};


export let menuRepositoryProvider = {
  provide: MenuRepository,
  useFactory: menuRepositoryProviderFactory,
  deps: [MenuClient]
};