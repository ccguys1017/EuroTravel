import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;
    //const { handleCheckboxChange, name } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(label);
    //handleCheckboxChange(name);
  }

  render() {
    //const { label } = this.props;
    const { name, place_id, price_level, rating, vicinity } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
                            type="checkbox"
                            value={ this.props.label.place_id }   // {label}
                            checked={isChecked}
                            onChange={this.toggleCheckboxChange}
                        />

          { this.props.label.name } { this.props.label.vicinity } 
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  //name: PropTypes.string.isRequired,
  //place_id: PropTypes.string.isRequired,
  //price_level: PropTypes.string,
  //rating: PropTypes.string,
  //vicinity: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;