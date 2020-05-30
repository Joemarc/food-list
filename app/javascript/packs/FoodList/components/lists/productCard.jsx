import React, {Component} from 'react';
import {Field, Form} from "react-final-form";
import QuantityInput from "../QuantityInput";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {updateProduct} from "../../actions";

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canEdit: false
    };
  }

  showEdit = () => {
    this.setState({canEdit: true})
  };

  onSubmit = (event) => {
    const { updateProduct: updateProductAction, product } = this.props;
    updateProductAction(product, {product: {description: event.product.description}}).then(() => this.setState({canEdit: false }))
  }

  render() {
    const { product, isLoading } = this.props;
    const { canEdit } = this.state;

    return (
      <div className="product-card">
        <div className="product-elements">
          <div className="left-infos">
            <h4 className="product-name">{product.name}</h4>
            <p className="green-category">{product.category}</p>
          </div>
          {canEdit ?
            <Form
              onSubmit={() => {
              }}
              initialValues={{ product }}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit} className="product-description">
                  <Field name="product.description" component="input" placeholder="Description du produit" />
                  <button className="small-red-btn" onClick={() => this.onSubmit(values)} >Valider</button>
                </form>
              )}
            />
            :
            <p onClick={this.showEdit} className="product-description">{product.description ? product.description : "Pas de description"} <i className="fas fa-edit"/></p>
          }
          <QuantityInput name="product.name" product={product} isLoading={isLoading}/>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateProduct
  }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(ProductCard));