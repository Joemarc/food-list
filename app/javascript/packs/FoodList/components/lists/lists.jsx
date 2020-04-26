import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {getLists, createList} from '../../actions';

import './lists.scss'
import {Field, Form} from "react-final-form";

class Lists extends Component {
  state = {
    showModalLists: false
  };

  componentDidMount() {
    const { getLists: getListsAction } = this.props;
    getListsAction();
  }

  onSubmit = (values) => {
    const { createList: createListAction, getLists: getListsAction } = this.props;
    const { showModalLists } = this.state;

    createListAction({list: {title: values.title, author: values.author, description: values.description}})
      .then(() => getListsAction()
        .then(this.setState({showModalLists: !showModalLists})))
  };

  render() {
    const { lists, isLoading } = this.props;
    const { showModalLists } = this.state;

    const renderLists = () => {
      let listsContent;
      if (isLoading) {
        return "chargement";
      } else if (lists.length) {
        listsContent = lists.map((list) =>
          <div className="list-card" key={list.id}>
            <h4>{list.title}</h4>
            <p>{list.description}</p>
            <div className="lists-card--buttons">
              <button className="button-lists" type="button">
                <a className="red" href={`list/${list.id}`}>Voir </a>
              </button>
              <button className="button-lists" type="button">
                <a className="red" href={`list/${list.id}/edit`}>Éditer </a>
              </button>
            </div>
          </div>
        )

      }
      return listsContent;
    };

    const renderListCreate = () => (
      <div className={`${showModalLists ? 'modal-opened-list' : 'modal-closed-list'}`}>
        <div >
          <button type="button" onClick={() => this.setState({ showModalLists: !showModalLists})} className="red-btn">
            <i className="fas fa-times filter-icon"/> Fermer / Revenir
          </button>
        </div>

        <div className="wrap-content">
          <h2 className="title-create">Création d'une liste de course</h2>
          <Form
            onSubmit={() => {
            }}
            render={({handleSubmit, values}) => (
              <form onSubmit={handleSubmit}>
                <div className="field-input">
                  <label>Titre de la liste</label>
                  <Field name="title" component="input" placeholder="Titre de la liste"/>
                </div>
                <div className="field-input">
                  <label>Auteur</label>
                  <Field name="author" component="input" placeholder="Auteur"/>
                </div>
                <Field
                  name="description"
                  render={({ input, meta }) => (
                    <div className="field-input">
                      <label>Description</label>
                      <textarea {...input} placeholder="description"/>
                      {meta.touched && meta.error && <span>{meta.error}</span>}
                    </div>
                  )}
                />
                <button className="red-btn" type="submit" onClick={() => this.onSubmit(values)}>Créer la liste</button>
              </form>
            )}
          />
        </div>
      </div>
    );


    return (
      <>
        <div className="wrap-content">
          <div className="title-create">
            <h2>Listes de course</h2>
            <button className="red-btn" type="button" onClick={() => this.setState({showModalLists: !showModalLists})}>Créer une liste</button>
          </div>
          <div className="lists-container">
            {renderLists()}
          </div>
        </div>
        {renderListCreate()}
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getLists, createList
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    lists: state.listReducer.lists,
    isLoading: state.listReducer.isLoading
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lists));