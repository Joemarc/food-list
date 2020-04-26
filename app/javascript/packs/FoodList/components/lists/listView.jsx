import React, {Component} from 'react';
import {getList, updateProduct, getInProducts, getOutProducts} from "../../actions";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import QuantityInput from "../QuantityInput";
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';

import './listView.scss'
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

class ListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showToBuy: true, showBasket: true
    };
  }

  componentDidMount() {
    this.getPage();
  }

  hideFilter = key => {
    const { showToBuy, showBasket } = this.state;

    let resultKey;
    switch (key) {
      case 'toBuy':
        resultKey = this.setState(() => ({ showToBuy: !showToBuy }));
        break;
      case 'basket':
        resultKey = this.setState(() => ({ showBasket: !showBasket }));
        break;
      default:
        return null;
    }
    return resultKey;
  };

  getPage = () => {
    const { getList: getListAction,
      getInProducts: getInProductsAction,
      getOutProducts: getOutProductsAction,
      match } = this.props;
    getListAction(match.params.id);
    getInProductsAction(match.params.id);
    getOutProductsAction(match.params.id)
  };

  updateStatus = (product, status) => {
    const {updateProduct: updateProductAction,} = this.props;

    updateProductAction(product, {product: {status: status}}).then(() =>
      this.getPage()
    )
  };

  render() {
    const { list, isLoading, match, inProducts, outProducts, isLoadingProducts } = this.props;
    const { showToBuy, showBasket } = this.state;

    const renderList = () => {
      let listContent;
      if (isLoading) {
        return "chargement";
      } else if (list) {
        listContent =
        <div className="wrap-content">
         <div className="content-list">
           <div className="list-infos">
             <h2>{list.title}</h2>
             <p>{list.description}</p>
           </div>
           <button className="list-edit"><a href={`${match.url}/edit`}>Éditer</a></button>
         </div>
        </div>
      }
      return listContent;
    };

    const renderInProducts = () => {
      let listInProducts;
      if (isLoadingProducts) {
        return "Les produits chargent";
      } else if (inProducts.length) {
        listInProducts =
          <>
            {inProducts.map((product) =>
              <SwipeableList key={product.id}>
                <SwipeableListItem
                  swipeRight={{
                    content: <div>Produit Trouvé</div>,
                    action: () => this.updateStatus(product, 1)
                  }}
                >
                  <div className="product-card">
                    <div className="product-elements">
                      <div className="left-infos">
                        <h4 className="product-name">{product.name}</h4>
                        <p className="green-category">{product.category}</p>
                      </div>
                      <p className="product-description">{product.description}</p>
                      <QuantityInput name="product.name" product={product} isLoading={isLoading}/>
                    </div>
                  </div>
                </SwipeableListItem>
              </SwipeableList>
            )}
          </>
      }
      return listInProducts;
    };

    const renderOutProducts = () => {
      let listOutProducts;
      if (isLoadingProducts) {
        return "Les produits chargent";
      } else if (outProducts.length) {
        listOutProducts =
          <>
            {outProducts.map((product) =>
              <SwipeableList key={product.id}>
                <SwipeableListItem
                  swipeRight={{
                    content: <div>Produit Non-trouvé</div>,
                    action: () => this.updateStatus(product, 0)
                  }}
                >
                  <div className="product-card">
                    <div className="product-elements">
                      <div className="left-infos">
                        <h4 className="product-name">{product.name}</h4>
                        <p className="green-category">{product.category}</p>
                      </div>
                      <p className="product-description">{product.description}</p>
                      <QuantityInput name="product.name" product={product} isLoading={isLoading}/>
                    </div>
                  </div>
                </SwipeableListItem>
              </SwipeableList>
            )}
        </>
      }
      return listOutProducts;
    };

    return (
      <>
        {renderList()}
        <div className="wrap-content product-to-find">
          <a href={`/categories?list_id=${match.params.id}`}><button type="button" className="add-products-btn">Ajouter des produits à la liste</button></a>
          <div className="title-display" onClick={() => this.hideFilter('toBuy')}>
            <h3 className="underlined-title"> Produits </h3>
            <span>(glisser à droite une fois le produit trouvé)</span>
            <i className={`fas fa-chevron-${showToBuy ? 'up' : 'down'} filter-icon`}/>
          </div>
          <div className={`content-${showToBuy ? 'appear' : 'disappear'}`}> {renderInProducts()}</div>
        </div>
        <div className="wrap-content product_found">
          <div className="title-display" onClick={() => this.hideFilter('basket')}>
            <h3 className="underlined-title">Dans le panier</h3>
            <span>(glisser à droite )</span>
            <i className={`fas fa-chevron-${showBasket ? 'up' : 'down'} filter-icon`}/>
          </div>
          <div className={`content-${showBasket ? 'appear' : 'disappear'}`}>{renderOutProducts()}</div>
        </div>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getList, updateProduct, getInProducts, getOutProducts
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    list: state.listReducer.list,
    isLoading: state.listReducer.isLoading,
    inProducts: state.productReducer.inProducts,
    outProducts: state.productReducer.outProducts,
    isLoadingProducts: state.productReducer.isLoading,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListView));