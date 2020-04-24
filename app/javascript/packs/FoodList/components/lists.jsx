import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getLists} from '../actions';

class Lists extends Component {
  render() {
    const { lists } = this.props;
    return (
      <div>
        { lists.length ? 'de' : 'da'}
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);