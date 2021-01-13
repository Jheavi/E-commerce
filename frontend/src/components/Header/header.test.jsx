import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loadShoppingCart } from '../../redux/actions/actions';
import '@testing-library/jest-dom';
import Header from './Header';

jest.mock('../../redux/actions/actions');

const initialState = { cartReducer: { cartSize: 2 } };

const buildStore = configureStore([thunk]);

describe('Header', () => {
  beforeEach(() => {
    const store = buildStore(initialState);
    store.dispatch = jest.fn();
    // eslint-disable-next-line react/prop-types
    const wrapper = ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );

    render(<Header />, { wrapper });
  });

  test('should render the title', () => {
    expect(document.querySelector('.cart-items').textContent).toBe('2');
  });

  test('should call loadItemsList action', () => {
    expect(loadShoppingCart).toHaveBeenCalled();
  });
});
