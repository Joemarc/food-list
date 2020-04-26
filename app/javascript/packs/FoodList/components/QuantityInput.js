import React, {Component} from 'react';
import 'rc-input-number/assets/index.css';
import InputNumber from 'rc-input-number';
import {bindActionCreators} from "redux";
import {updateProduct} from "../actions";
import {withRouter} from "react-router";
import {connect} from "react-redux";

class QuantityInput extends Component {
  state = {
    quantity: this.props.product.quantity,
  };

  onChange = (quantity) => {
    this.setState({ quantity });
  };

  updateQuantity = () => {
    const { updateProduct: updateProductAction, product } = this.props;
    updateProductAction(product, {product: {quantity: this.state.quantity}})
  };

  render() {
    const { isLoading } = this.props;

    return (
      <div className="quantity-container">
        <InputNumber
          aria-label="Simple number input example"
          min={1}
          max={100}
          style={{ width: '100%' }}
          value={this.state.quantity}
          onChange={this.onChange}
          readOnly={this.state.readOnly}
          disabled={isLoading}
        />
        <button className="btn-icon-check" type="button" onClick={this.updateQuantity}><i className="fas fa-check"/></button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateProduct
  }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(QuantityInput));