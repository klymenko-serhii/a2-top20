import { FilmPage } from './app.po';

describe('film App', function() {
  let page: FilmPage;

  beforeEach(() => {
    page = new FilmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
