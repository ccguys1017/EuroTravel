import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Button } from "./Button";
class Dropdown extends React.Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  handleClick(e) {
    // Get Cursor Position
    this.props.isOpen = !this.props.isOpen;
  }

  onClick(e) {
    e.preventDefeault();
    alert("yojulius");
  }

  componentDidMount() {
    // this.handleProps();
    console.log("somekine");
    document.body.addEventListener("click", this.handleClick);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      // this.handleProps();
      console.log("a somethin");
    }
  }

  componentWillUnmount() {
    this.removeEvents();
  }

  render() {
    let { isOpen, className, tag: Tag, ...attributes } = this.props;

    let classes = classNames("dropdown", isOpen ? "show" : "", className);

    return <Tag className={classes}>whoa no no</Tag>;
  }
}

Dropdown.defaultProps = {
  isOpen: false,
  tag: "div"
};

Dropdown.propTypes = {
  disabled: PropTypes.bool,
  dropup: PropTypes.bool,
  group: PropTypes.bool,
  isOpen: PropTypes.bool,
  size: PropTypes.string,
  tag: PropTypes.string,
  tether: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  toggle: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

export default Dropdown;
