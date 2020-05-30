import React, {Component} from 'react';
import {getListEdit, updateList} from "../../actions";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import { Form, Field } from 'react-final-form';

import './listEdit.scss'
import displayToast from "../toastUtils";

class ListEdit extends Component {
  componentDidMount() {
    const { getListEdit: getListEditAction, match } = this.props;
    getListEditAction(match.params.id);
  }

  update = values => {
    const { updateList: updateListAction, match } = this.props;
    updateListAction(match.params.id, values).then(() => displayToast('La liste a bien été modifiée', false));
  };

  render() {
    const { list, isLoading, match } = this.props;
  console.log(match)
    const renderList = () => {
      let listContent;
      if (isLoading) {
        return "chargement";
      } else if (list) {
        listContent =
          <>
            <h2>Éditer ma liste</h2>
            <Form
              onSubmit={() => {
              }}
              initialValues={{ list }}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <div className="list-form-element">
                    <label>Titre de la liste</label>
                    <Field className="field-style" name="list.title" component="input" placeholder="Titre de la liste" />
                  </div>
                  <div className="list-form-element">
                    <label>Description de la liste</label>
                    <Field className="field-style" name="list.description" component="textarea" placeholder="Description de la liste" />
                  </div>
                  <div className="list-form-element">
                    <label>Auteur de la liste</label>
                    <Field className="field-style" name="list.author" component="input" placeholder="Auteur de la liste" />
                  </div>
                  <div className="button-edit-container">
                    <button type="button" className="btn-edit"><a href={`/list/${list.id}`}>Revenir</a></button>
                    <button type="button" className="btn-edit" onClick={() => this.update(values)}>Mettre à jour</button>
                  </div>
                </form>
              )}
            />
          </>
      }
      return listContent;
    };

    return (
      <div className="wrap-content">
        {renderList()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getListEdit, updateList
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    list: state.listReducer.list,
    isLoading: state.listReducer.isLoading
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListEdit));