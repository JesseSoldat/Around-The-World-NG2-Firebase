import { AroundTheWorldPage } from './app.po';

describe('around-the-world App', () => {
  let page: AroundTheWorldPage;

  beforeEach(() => {
    page = new AroundTheWorldPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
