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

  describe('loadShoppingCart', () => {
    test('should call axios', async () => {
      await store.dispatch(actions.loadShoppingCart());

      expect(axios.get).toHaveBeenCalledWith(shoppingCartUrl);
    });

    test('the store should have an action with type LOAD_SHOPPING_CART', async () => {
      axios.get = jest.fn().mockResolvedValueOnce(fakeData);

      await store.dispatch(actions.loadShoppingCart());

      expect(store.getActions()[0]).toEqual({
        type: actionTypes.LOAD_SHOPPING_CART,
        cartList: fakeData.data,
      });
    });

    test('the store should have an action with type LOAD_SHOPPING_CART_error if promise rejected', async () => {
      axios.get = jest.fn().mockRejectedValueOnce(fakeError);

      await store.dispatch(actions.loadShoppingCart());

      expect(store.getActions()[0]).toEqual({
        type: actionTypes.LOAD_SHOPPING_CART_ERROR,
        error: fakeError,
      });
    });
  });

  describe('putItemInCart', () => {
    test('should call axios', async () => {
      await store.dispatch(actions.putItemInCart({}));

      expect(axios.patch).toHaveBeenCalledWith(shoppingCartUrl, { item: {} });
    });

    test('the store should have an action with type PUT_ITEM_IN_CART', async () => {
      axios.patch = jest.fn().mockResolvedValueOnce(fakeData);

      await store.dispatch(actions.putItemInCart({}));

      expect(store.getActions()[0]).toEqual({
        type: actionTypes.PUT_ITEM_IN_CART,
        cartItem: fakeData.data,
      });
    });

    test('the store should have an action with type PUT_ITEM_IN_CART_ERROR if promise rejected', async () => {
      axios.patch = jest.fn().mockRejectedValueOnce(fakeError);

      await store.dispatch(actions.putItemInCart({}));

      expect(store.getActions()[0]).toEqual({
        type: actionTypes.PUT_ITEM_IN_CART_ERROR,
        error: fakeError,
      });
    });
  });

  describe('deleteItemFromCart', () => {
    test('should call axios', async () => {
      const config = { data: {} };
      await store.dispatch(actions.deleteItemFromCart({}));

      expect(axios.delete).toHaveBeenCalledWith(shoppingCartUrl, config);
    });

    test('the store should have an action with type DELETE_ITEM_FROM_CART', async () => {
      axios.delete = jest.fn().mockResolvedValueOnce(fakeData);

      await store.dispatch(actions.deleteItemFromCart({}));

      expect(store.getActions()[0]).toEqual({
        type: actionTypes.DELETE_ITEM_FROM_CART,
        cartItem: fakeData.data,
      });
    });

    test('the store should have an action with type DELETE_ITEM_FROM_CART_ERROR if promise rejected', async () => {
      axios.delete = jest.fn().mockRejectedValueOnce(fakeError);

      await store.dispatch(actions.deleteItemFromCart({}));

      expect(store.getActions()[0]).toEqual({
        type: actionTypes.DELETE_ITEM_FROM_CART_ERROR,
        error: fakeError,
      });
    });
  });

  describe('filterItems', () => {
    test('should return action with type FILTER_ITEMS', () => {
      expect(actions.filterItems(null).type).toBe(actionTypes.FILTER_ITEMS);
    });
  });
});
