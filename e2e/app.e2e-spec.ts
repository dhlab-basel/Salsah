import { V2DevPage } from './app.po';

describe('v2-dev App', function() {
  let page: V2DevPage;

  beforeEach(() => {
    page = new V2DevPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
