import { getUrlWithQuery, Url } from './url';

describe('Url', () => {
  it('Should return formatted url with params', () => {
    const expectedUrl = 'http://someUrl?param1=a&param2=b';
    const url = new Url('http://someUrl', { param1: 'a', param2: 'b' });

    expect(url.toString()).toEqual(expectedUrl);
  });

  it('Should return formatted url without params', () => {
    const expectedUrl = 'http://someUrl';
    const url = new Url('http://someUrl');

    expect(url.toString()).toEqual(expectedUrl);
  });

  it('Should add one param', () => {
    const expectedUrl = 'http://someUrl?param1=a&param2=b';
    const url = new Url('http://someUrl', { param1: 'a' });

    url.addParams({ param2: 'b' });

    expect(url.toString()).toEqual(expectedUrl);
  });

  it('Should add two params', () => {
    const expectedUrl = 'http://someUrl?param1=a&param2=b&param3=c';
    const url = new Url('http://someUrl', { param1: 'a' });

    url.addParams({ param2: 'b', param3: 'c' });

    expect(url.toString()).toEqual(expectedUrl);
  });
});

describe('getUrlWithQuery', () => {
  const getParams = ({ search, queryName, queryValue }) => ({
    location: { pathname: 'home', search },
    queryName,
    queryValue,
  });

  it('Should return correct url when query already exists', () => {
    const res = getUrlWithQuery(
      getParams({ search: '?page=4', queryName: 'page', queryValue: '2' })
    );

    expect(res).toEqual('home?page=2');
  });

  it("Should return correct url when query doesn't exist yet", () => {
    const res = getUrlWithQuery(
      getParams({ search: '?page=4', queryName: 'id', queryValue: 'DEC' })
    );

    expect(res).toEqual('home?page=4&id=DEC');
  });
});
