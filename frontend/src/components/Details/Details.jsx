import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { loadItem, putItemInCart } from '../../redux/actions/actions';
import './details.css';
import MonitorDetails from './MonitorDetails/MonitorDetails';
import RamDetails from './RamDetails/RamDetails';
import SsdDetails from './SsdDetails/SsdDetails';

function Details({ dispatch, item, match }) {
  const [id] = useState(match.params.itemId);

  useEffect(() => {
    if (!item || item.id !== id) {
      dispatch(loadItem(id));
    }
  }, []);

  return (
    <main className="details">
      {item
      && (
      <>
        <div className="details__top d-flex align-items-center">
          <h1 className="details__title">
            {`${item.manufacturer} ${item['product-name']}`}
          </h1>
          <div className="flex-1" />
          <button type="button" className="add-to-cart-btn" onClick={() => dispatch(putItemInCart(item))}>Add to cart</button>
        </div>
        <div className="d-flex mob-vertical">
          <img src={item['product-image']} alt={`${item['product-name']}`} className="details__image" />
          <div className="d-flex flex-column details__info">
            <a href={`${item['product-url']}`} className="mb-3" target="_blank" rel="noopener noreferrer">Visita la tienda</a>
            <span>{`Product: ${item['product-name']}`}</span>
            <span>{`Manufacturer: ${item.manufacturer}`}</span>
            <div className="flex-2" />
            <div className="d-flex">
              <span className="mr-3">Previous price: </span>
              <span className="details__prev-price">{`${Math.floor(+(item.price) * 1.4)}.00€`}</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="mr-3">Now:</span>
              <span className="details__price">{`${item.price}€`}</span>
            </div>
            <div className="flex-2" />
            <span className="details__type">{`${item['product-type']}`}</span>
            {item['product-type'] === 'Monitor' && <MonitorDetails item={item} />}
            {item['product-type'] === 'RAM Memory' && <RamDetails item={item} />}
            {item['product-type'] === 'SSD Hard Disk' && <SsdDetails item={item} />}
            <div className="flex-1" />
          </div>
        </div>
      </>
      )}
    </main>
  );
}

Details.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    'product-type': PropTypes.string,
    'product-name': PropTypes.string,
    'product-image': PropTypes.string,
    'product-url': PropTypes.string,
    price: PropTypes.string,
    manufacturer: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      itemId: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

Details.defaultProps = {
  item: undefined,
};

function mapStateToProps({ itemsReducer }) {
  return { item: itemsReducer.item };
}

export default connect(mapStateToProps)(Details);
