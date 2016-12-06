import { Salsah2Page } from './app.po';

describe('salsah-2 App', function() {
  let page: Salsah2Page;

  beforeEach(() => {
    page = new Salsah2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('salsah works!');
  });
});
