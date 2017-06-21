import { Test2Page } from './app.po';

describe('test2 App', () => {
  let page: Test2Page;

  beforeEach(() => {
    page = new Test2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
