import { TroumacaWebPage } from './app.po';

describe('troumaca-web App', () => {
  let page: TroumacaWebPage;

  beforeEach(() => {
    page = new TroumacaWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
