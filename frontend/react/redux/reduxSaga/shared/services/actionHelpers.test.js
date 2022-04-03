import { Action, AsyncAction } from './actionHelpers';

describe('Action Helpers', () => {
  const asyncAction = new AsyncAction(`GET_ASYNC_DATA`);
  const action = new Action('GET_DATA');
  const payload = 10;

  it('should change result of async call based on request type', () => {
    expect(asyncAction.REQUEST).toEqual('GET_ASYNC_DATA_REQUEST');
    expect(asyncAction.SUCCESS).toEqual('GET_ASYNC_DATA_SUCCESS');
    expect(asyncAction.FAILURE).toEqual('GET_ASYNC_DATA_FAILURE');
  });

  it('should change result of async call based on request type with payload', () => {
    expect(asyncAction.request(payload)).toEqual({ type: 'GET_ASYNC_DATA_REQUEST', payload });
    expect(asyncAction.success(payload)).toEqual({ type: 'GET_ASYNC_DATA_SUCCESS', payload });
    expect(asyncAction.failure(payload)).toEqual({ type: 'GET_ASYNC_DATA_FAILURE', payload });
  });

  it('should create action with payload', () => {
    expect(action.ACTION).toEqual('GET_DATA');
    expect(action.action(10)).toEqual({ type: 'GET_DATA', payload });
  });

  it('should throw an error if async action initialized without type', () => {
    expect(() => new AsyncAction()).toThrow(new Error('Type parameter is mandatory'));
  });

  it('should throw an error if action initialized without type', () => {
    expect(() => new Action()).toThrow(new Error('Type parameter is mandatory'));
  });
});
