import {HomeService} from "./home.service";
import {HomeRepository} from "./home.repository";

export function homeServiceProviderFactory (homeRepository: HomeRepository): HomeService {
  let homeService: HomeService;
  if (!homeService) {
    homeService = new HomeService(homeRepository);
  }
  return homeService;
}

export let homeServiceProvider = {
  provide: HomeService,
  useFactory: homeServiceProviderFactory,
  useClass: HomeService,
  deps: [HomeRepository]
};
