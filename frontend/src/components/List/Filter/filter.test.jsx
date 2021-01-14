/* eslint-disable react/prop-types */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { filterItems } from '../../../redux/actions/actions';
import '@testing-library/jest-dom';
import Filter from './Filter';

jest.mock('../../../redux/actions/actions');

const initialState = {
  itemsReducer: {
    items: [{ 'product-type': 'Monitor' }],
    productTypes: ['Monitor'],
  },
};

const buildStore = configureStore([thunk]);

describe('Filter', () => {
  beforeEach(() => {
    const store = buildStore(initialState);
    store.dispatch = jest.fn();

    const wrapper = ({ children }) => (
      <Provider store={store}>
        {children}
      </Provider>
    );

    render(<Filter />, { wrapper });
  });

  test('should render the product type of the product', () => {
    const productTypeLabel = document.getElementsByClassName('filters__label')[0];

    expect(productTypeLabel.innerHTML).toBe('Monitor');
  });

  test('the input should call filterItems', () => {
    const productType = document.getElementById('Monitor');

    fireEvent.click(productType);

    expect(filterItems).toHaveBeenCalledWith('Monitor');
  });

  test('the reset filters button should call filterItems with null', () => {
    const resetFiltersBtn = document.querySelector('.filters__button');

    fireEvent.click(resetFiltersBtn);

    expect(filterItems).toHaveBeenCalledWith(null);
  });
});
