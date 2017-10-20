import React, { Component, PropTypes } from 'react';
import {ListGroupItem} from 'react-bootstrap';

class Checkbox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label, handleSave } = this.props;
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
      <ListGroupItem className='cardList' style={{width:'40%'}}>
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={ this.props.label.place_id }
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          /><span className="badge">{this.props.label.types[0]}</span>
          <h4><strong>  { this.props.label.name }</strong></h4> <h4>{ this.props.label.vicinity } </h4>
          
        </label>
      </div>
      </ListGroupItem>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;
