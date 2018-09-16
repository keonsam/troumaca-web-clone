import {MenuService} from './menu.service';
import {MenuRepository} from './menu.repository';

export function menuServiceProviderFactory (menuRepository: MenuRepository): MenuService {
  let menuService: MenuService;
  if (!menuService) {
    menuService = new MenuService(menuRepository);
  }
  return menuService;
}

export let menuServiceProvider = {
  provide: MenuService,
  useFactory: menuServiceProviderFactory,
  useClass: MenuService,
  deps: [MenuRepository]
};
