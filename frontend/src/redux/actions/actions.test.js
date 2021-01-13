import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as actions from './actions';
import actionTypes from './action-types';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const listUrl = 'http://localhost:2130/';
const shoppingCartUrl = 'http://localhost:2130/shoppingcart';

describe('FrontEnd actions', () => {
  let fakeData;
  let fakeError;
  let store;

  beforeEach(() => {
    fakeData = { data: { id: 1 } };
    fakeError = 'error';
    store = mockStore();
  });

  afterEach(() => {
    store = null;
  });

  describe('loadItemsList', () => {
    beforeEach(() => {
      fakeData = { data: { id: 1 } };
    });

    test('should call axios', async () => {
      await store.dispatch(actions.loadItemsList());

      expect(axios.get).toHaveBeenCalledWith(listUrl);
    });

    test('the store should have an action with type LOAD_ITEMS_LIST', async () => {
      axios.get = jest.fn().mockResolvedValueOnce(fakeData);

      await store.dispatch(actions.loadItemsList());

      expect(store.getActions()[0]).toEqual({
        type: actionTypes.LOAD_ITEMS_LIST,
        itemList: fakeData.data,
      });
    });

    test('the store should have an action with type LOAD_ITEMS_LIST_ERROR if promise rejected', async () => {
      axios.get = jest.fn().mockRejectedValueOnce(fakeError);

      await store.dispatch(actions.loadItemsList());

      expect(store.getActions()[0]).toEqual({
        type: actionTypes.LOAD_ITEMS_LIST_ERROR,
        error: fakeError,
      });
    });
  });

  describe('loadItem', () => {
    let fakeId;
    beforeEach(() => {
      fakeData = { data: { id: 1 } };
      fakeId = 1;
    });

    test('should call axios', async () => {
      await store.dispatch(actions.loadItem(fakeId));

      expect(axios.get).toHaveBeenCalledWith(`${listUrl}${fakeId}`);
    });

    test('the store should have an action with type LOAD_ITEM', async () => {
      axios.get = jest.fn().mockResolvedValueOnce(fakeData);

      await store.dispatch(actions.loadItem(fakeId));

      expect(store.getActions()[0]).toEqual({
        type: actionTypes.LOAD_ITEM,
        item: fakeData.data,
      });
    });

    test('the store should have an action with type LOAD_ITEM_ERROR if promise rejected', async () => {
      axios.get = jest.fn().mockRejectedValueOnce(fakeError);

      await store.dispatch(actions.loadItem(fakeId));

      expect(store.getActions()[0]).toEqual({
        type: actionTypes.LOAD_ITEM_ERROR,
        error: fakeError,
      });
    });
  });

  describe('loadCartSuccess', () => {
    test('should return action with type LOAD_SHOPPING_CART', () => {
      expect(actions.loadCartSuccess(null).type).toBe(actionTypes.LOAD_SHOPPING_CART);
    });
  });

  describe('loadShoppingCart', () => {
    beforeEach(async () => {
      fakeData = { data: { id: 1 } };
      axios.get.mockImplementationOnce(() => Promise.resolve(fakeData));
      await store.dispatch(actions.loadShoppingCart());
    });

    test('should call axios', () => {
      expect(axios.get).toHaveBeenCalledWith(shoppingCartUrl);
    });
  });

  describe('putItemCartSuccess', () => {
    test('should return action with type PUT_ITEM_IN_CART', () => {
      expect(actions.putItemCartSuccess(null).type).toBe(actionTypes.PUT_ITEM_IN_CART);
    });
  });

  describe('putItemInCart', () => {
    beforeEach(async () => {
      fakeData = { data: { id: 1 } };
      axios.patch.mockImplementationOnce(() => Promise.resolve(fakeData));
      await store.dispatch(actions.putItemInCart(fakeData));
    });

    test('should call axios', () => {
      expect(axios.patch).toHaveBeenCalledWith(shoppingCartUrl, { item: fakeData });
    });
  });

  describe('deleteItemCartSuccess', () => {
    test('should return action with type DELETE_ITEM_FROM_CART', () => {
      expect(actions.deleteItemCartSuccess(null).type).toBe(actionTypes.DELETE_ITEM_FROM_CART);
    });
  });

  describe('deleteItemFromCart', () => {
    let config;
    beforeEach(async () => {
      fakeData = { data: { id: 1 } };
      config = { data: 'abc' };
      axios.delete.mockImplementationOnce(() => Promise.resolve(fakeData));
      await store.dispatch(actions.deleteItemFromCart('abc'));
    });

    test('should call axios', () => {
      expect(axios.delete).toHaveBeenCalledWith(shoppingCartUrl, config);
    });
  });

  describe('filterItems', () => {
    test('should return action with type FILTER_ITEMS', () => {
      expect(actions.filterItems(null).type).toBe(actionTypes.FILTER_ITEMS);
    });
  });
});
