import { browser, element, by } from 'protractor';

export class Salsah2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('salsah-root h1')).getText();
  }
}
