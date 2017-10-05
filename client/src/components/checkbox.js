import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(label);
  }

  render() {
    const { name, place_id, price_level, rating, type, vicinity } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={ this.props.label.place_id }
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          /><span className="badge">{this.props.label.types[0]}</span>
          <i>Name: </i><strong>{ this.props.label.name }</strong> <i>Address: </i>{ this.props.label.vicinity } 
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;