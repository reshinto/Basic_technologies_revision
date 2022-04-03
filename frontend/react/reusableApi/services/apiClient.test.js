import fetchMock from 'fetch-mock/es5/client';

import { apiClient, isJsonContentType } from './apiClient';

describe('apiClient', () => {
  it('Should return parsed json', () => {
    const expected = { a: 'a', b: null };
    const response = JSON.stringify(expected);
    const route = 'http://example.com/tets1';

    fetchMock.postOnce(route, {
      body: response,
      headers: { 'content-type': 'application/json' },
    });

    return apiClient.post(route, {}).then((data) => expect(data).toEqual(expected));
  });

  it('Should return text', () => {
    const expected = JSON.stringify({ a: 'a', b: null });
    const response = expected;
    const route = 'http://example.com/test2';

    fetchMock.postOnce(route, {
      body: response,
      status: 200,
    });

    return apiClient.post(route, {}).then((data) => expect(data).toEqual(expected));
  });

  it('Should throw server error', () => {
    const expected = { errors: [1, 2, 3] };
    const response = JSON.stringify(expected);
    const route = 'http://example.com/throwError';

    fetchMock.postOnce(route, {
      body: response,
      headers: { 'content-type': 'application/json' },
      status: 401,
    });

    return apiClient.post(route, {}).catch((data) => expect(data).toEqual(expected));
  });

  describe('isJsonContentType', () => {
    it('Should be true for json content types', () => {
      expect(isJsonContentType('application/hal+json')).toBeTruthy();
      expect(isJsonContentType('application/json')).toBeTruthy();
    });

    it('Should be false for not json content types', () => {
      expect(isJsonContentType('text')).toBeFalsy();
    });
  });
});
