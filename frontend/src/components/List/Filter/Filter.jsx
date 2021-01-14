import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { filterItems } from '../../../redux/actions/actions';
import './filter.css';

function Filter({ productTypes, dispatch }) {
  function resetFilters(inputCollection) {
    Array.prototype.forEach.call(inputCollection, (input) => {
      const inputBtn = input;
      inputBtn.checked = false;
    });
    dispatch(filterItems(null));
  }
  return (
    <section>
      <ul className="filters">
        {productTypes?.map((type) => (
          <li key={Math.random() * Math.random()}>
            <input
              type="radio"
              value={type}
              id={type}
              className="filters__input mr-2"
              name="filter-types"
              onChange={(event) => {
                dispatch(filterItems(event.target.value));
              }}
            />
            <label htmlFor={type} className="filters__label mr-5">{type}</label>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="filters__button"
        onClick={() => {
          resetFilters(document.querySelectorAll('.filters__input'));
        }}
      >
        Reset filters

      </button>
    </section>
  );
}

Filter.propTypes = {
  productTypes: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func.isRequired,
};

Filter.defaultProps = {
  productTypes: undefined,
};

function mapStateToProps({ itemsReducer }) {
  return {
    items: itemsReducer.itemList,
    productTypes: itemsReducer.productTypes,
  };
}

export default connect(mapStateToProps)(Filter);
