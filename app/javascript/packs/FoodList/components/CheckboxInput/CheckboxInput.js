import React, { Component } from 'react';

import './CheckboxInput.module.scss';

class CheckboxInput extends Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: false };
  }

  handleChecked = () => {
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
  };

  render() {
    const { textLabel, inputId, checked } = this.props;

    return (
      <label className="checkbox-input-label" htmlFor={inputId}>
        <input type="checkbox" className="checkbox-input" id={inputId} checked={checked}
               onChange={this.handleChecked} />
        <span className="checkbox-input-checkmark" />
        <span className="checkbox-input-text-label">{textLabel}</span>
      </label>
    );
  }
}

export default CheckboxInput;