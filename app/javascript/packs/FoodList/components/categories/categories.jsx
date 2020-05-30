import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {getCategories, createProduct, getListsProducts, createProductName, createCategory} from "../../actions";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import { Form, Field } from 'react-final-form';
import * as queryString from 'query-string';

import './categories.scss'
import ProfileFormCheckbox from "../ProfileFormChecbox";
import ProfileFormSelectSingle from "../ProfileFormSelectSingle";
import displayToast from "../toastUtils";

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProducts: [],
      showModal: false,
      selectedCategory: null,
      showModalCategory: false,
    };
  }

  componentDidMount() {
    this.getActions()
  }

  getActions = () => {
    const {
      getCategories: getCategoriesAction,
      getListsProducts: getListsProductsAction,
      location
    } = this.props;
    getCategoriesAction();
    getListsProductsAction(queryString.parse(location.search).list_id);
  };

  handleCheckboxChange = (checkbox, selectedState) => {
    const parsed = parseInt(checkbox.target.value, 10);
    const position = selectedState.indexOf(parsed);
    const currentState = checkbox.target.name;

    if (position !== -1) {
      this.setState(previousState => {
        const newArray = [...previousState[currentState]].slice();
        newArray.splice(position, 1);
        return { [currentState]: newArray };
      });
    } else {
      this.setState(previousState => {
        const valuesChecked = [...previousState[currentState], parsed];
        return { [currentState]: valuesChecked };
      });
    }
  };

  onSubmit = () => {
    const { createProduct: createProductAction, location, history } = this.props;
    const { selectedProducts } = this.state;

    createProductAction({product: {product_ids: selectedProducts, list_id: queryString.parse(location.search).list_id}})
      .then(() => history.push(`/list/${queryString.parse(location.search).list_id}`))
      .then(() => displayToast('Vos produits a bien été ajouté à votre list', false));
  };


  addProduct = (values) => {
    const { createProductName: createProductNameAction } = this.props;
    const { selectedCategory } = this.state;

    createProductNameAction({product_name: {category_id: selectedCategory.id, name: values.name, description: values.description}})
      .then(() => this.getActions()).then(() => this.setState({showModal: !this.showModal}))
      .then(() => displayToast('Votre produit a bien crée', false));
  };

  addCategory = (values) => {
    const { createCategory: createCategoryAction } = this.props;
    createCategoryAction({name: values.category.name})
      .then(() => this.getActions())
      .then(() => displayToast('Votre catégorie a bien été créée', false));
  };

  handleCategorySelect = selectedCategory => {
    this.setState({ selectedCategory });
  };

  render() {
    const { isLoading, categories } = this.props;
    const { selectedProducts, showModal, selectedCategory, showModalCategory } = this.state;

    const renderNotInListProducts = () => {
      let notInListProductsList;
      if (isLoading) {
        return "Les produits chargent";
      } else if (categories.length) {

        notInListProductsList =
          <>
            {categories.map((category) =>
              <div className="category-container" key={category.id}>
                <h3 className="category-title-display">{category.name}</h3>
                {category.clean_products.map((product) => {
                    if (category.id === product.category_id) {
                      return (
                        <Form
                          key={product.id}
                          onSubmit={() => {
                          }}
                          render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                              <div className="category-list">
                                <ProfileFormCheckbox name="selectedProducts" value={product.id}
                                                     id={`offer-working-times-checkbox-input-${product.id}`}
                                                     labelText={product.name} key={product.id}
                                                     checked={selectedProducts.indexOf(product.id) !== -1}
                                                     onChange={c => this.handleCheckboxChange(c, selectedProducts)}/>
                              </div>
                            </form>
                          )}
                        />
                      )
                    } else {
                      return null;
                  }}
                )}
              </div>
            )}
          </>
      }
      return notInListProductsList;
    };

    const renderModal = () => (
          <div className={`${showModal ? 'modal-opened' : 'modal-closed'}`}>
            <div >
              <button type="button" onClick={() => this.setState({ showModal: !showModal})} className="red-btn">
                <i className="fas fa-times filter-icon"/> Fermer / Revenir
              </button>
            </div>
            <div className="wrap-content">
              <h2 className="category-title-display">Ajout d'un produit</h2>
              <Form
                onSubmit={() => {
                }}
                render={({handleSubmit, values}) => (
                  <form onSubmit={handleSubmit}>
                    <div className="field-input">
                      <label>Nom du produit</label>
                      <Field name="name" component="input" placeholder="Nom du produit"/>
                    </div>

                    <ProfileFormSelectSingle name="product_name.category" id="categories-add"
                                             onChange={this.handleCategorySelect} value={selectedCategory}
                                             labelText="Catégorie du produit*" options={categories}
                                             placeholder="Sélectionner dans la liste" />

                  <button className="red-btn" type="submit" onClick={() => this.addProduct(values)}>Ajouter le produit</button>
                  </form>
                )}
              />
            </div>
          </div>
    );

    const renderModalCategory = () => (
      <div className={`${showModalCategory ? 'modal-opened-cat' : 'modal-closed-cat'}`}>
        <div >
          <button type="button" onClick={() => this.setState({ showModalCategory: !showModalCategory})} className="red-btn">
            <i className="fas fa-times filter-icon"/> Fermer / Revenir
          </button>
        </div>

        <div className="wrap-content">
          <h2 className="category-title-display">Ajout d'une catégorie</h2>
          <Form
            onSubmit={() => {
            }}
            render={({handleSubmit, values}) => (
              <form onSubmit={handleSubmit}>
                <div className="field-input">
                  <label>Nom de la catégorie</label>
                  <Field name="category.name" component="input" placeholder="Nom de la catégorie"/>
                </div>
                <button className="red-btn" type="submit" onClick={() => this.addCategory(values)}>Ajouter la catégorie</button>
              </form>
            )}
          />
        </div>
      </div>
    );

    return (
      <>
        <div className="wrap-content">
          <div className="buttons-missing">
            <button type="button" className="missing-btn" onClick={() => this.setState({showModal: !showModal})}>
              Ajouter un nouveau produit
            </button>
            <button type="button" className="missing-btn" onClick={() => this.setState({showModalCategory: !showModalCategory})}>
              Ajouter une catégorie
            </button>
          </div>
        <p>Ne sont affichés que les produits qui ne sont pas présents dans la liste</p>
        {renderNotInListProducts()}
        <button type="submit" className="add-btn" onClick={this.onSubmit}>Ajouter la séléction à la liste</button>
      </div>
        {renderModal()}
        {renderModalCategory()}
      </>
    );
  }
}

function addOptionsToAttributes(array) {
  return array.map(item => {
    return Object.assign(item, {
      value: item.name,
      label: item.name
    });
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCategories, createProduct, getListsProducts, createProductName, createCategory
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    categories: addOptionsToAttributes(state.categoryReducer.categories),
    isLoading: state.categoryReducer.isLoading,
    products: state.listReducer.products,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories));