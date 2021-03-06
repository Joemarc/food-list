import React, {Component} from 'react';
import {getList, updateProductIn, updateProductOut, getInProducts, getOutProducts, deleteProduct, refreshList} from "../../actions";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import displayToast from "../toastUtils";

import './listView.scss'
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import ProductCard from "./productCard";

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
    const {updateProductIn: updateProductInAction, updateProductOut: updateProductOutAction} = this.props;
    product.status === "in" ?
      updateProductOutAction(product, {product: {status: status}}).then(() => displayToast('Produit mis dans le panier', false))
      :
      updateProductInAction(product, {product: {status: status}}).then(() => displayToast('Produit remis dans la liste de course', false))
  };

  deleteProduct = product => {
    const { deleteProduct: deleteProductAction } = this.props;
    deleteProductAction(product).then(() => displayToast('Produit supprimé de la liste', false));
  }

  refreshList = () => {
    const { refreshList : refreshListAction, match } = this.props;
    refreshListAction(match.params.id).then(() => displayToast('Tous les Produit ont été remis dans la liste de course', false));
  }

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
                    content: <div className="swipe-right-class"><i className="fas fa-check filter-icon"/> Produit trouvé</div>,
                    action: () => this.updateStatus(product, 1)
                  }}
                  swipeLeft={{
                    content: <div className="swipe-left-class">Supprimer le produit de la liste <i className="fas fa-trash filter-icon"/></div>,
                    action: () => this.deleteProduct(product)
                  }}
                >
                  <ProductCard product={product}/>
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
                    content: <div className="swipe-right-class"><i className="fas fa-check filter-icon"/> Remettre dans la liste à trouver</div>,
                    action: () => this.updateStatus(product, 0)
                  }}
                  swipeLeft={{
                    content: <div className="swipe-left-class">Supprimer le produit de la liste <i className="fas fa-trash filter-icon"/></div>,
                    action: () => this.deleteProduct(product)
                  }}
                >
                  <ProductCard product={product}/>
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
            <i className={`fas fa-chevron-${showToBuy ? 'up' : 'down'} filter-icon`}/>
          </div>

          <div className={`content-${showToBuy ? 'appear' : 'disappear'}`}> <span>(glisser à droite une fois le produit trouvé)</span>{renderInProducts()}</div>
        </div>
        <div className="wrap-content product_found">
          <div className="title-display" onClick={() => this.hideFilter('basket')}>
            <h3 className="underlined-title">Dans le panier</h3>
            { outProducts ? <button type="button" className="red-btn" onClick={() => this.refreshList()}> Tout remettre dans la liste de courses </button> : null}
            <i className={`fas fa-chevron-${showBasket ? 'up' : 'down'} filter-icon`}/>
          </div>
          <div className={`content-${showBasket ? 'appear' : 'disappear'}`}> <span>(glisser à droite pour remettre dans la liste de course )</span>{renderOutProducts()}</div>
        </div>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getList, updateProductIn, updateProductOut, getInProducts, getOutProducts, deleteProduct, refreshList
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