import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {getLists} from '../../actions';

import './lists.scss'

class Lists extends Component {
  componentDidMount() {
    const { getLists: getListsAction } = this.props;
    getListsAction();
  }

  render() {
    const { lists, isLoading } = this.props;

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
                <a href={`list/${list.id}`}>Voir </a>
              </button>
              <button className="button-lists" type="button">
                <a href={`list/${list.id}/edit`}>Éditer </a>
              </button>
            </div>
          </div>
        )

      }
      return listsContent;
    };

    return (
      <div className="wrap-content">
        <h1>Listes de course</h1>
        <div className="lists-container">
          {renderLists()}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getLists
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    lists: state.listReducer.lists,
    isLoading: state.listReducer.isLoading
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lists));