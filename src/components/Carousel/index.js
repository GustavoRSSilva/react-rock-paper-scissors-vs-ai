import React, { Component } from 'react';
import Proptypes from 'prop-types';

class Carousel extends Component {
  constructor(props) {
    super(props);

    const options = props.options;

    this.state = {
      selected: options[Math.floor(Math.random() * options.length)]
    };
  }

  componentDidMount() {
    this.setSelectedOption();
  }

  componentDidUpdate() {
    this.setSelectedOption();
  }

  setSelectedOption() {
    const options = this.props.options;
    setTimeout(
      () => this.setState({ selected: options[Math.floor(Math.random() * options.length)] })
    ,400);
  }

  render() {
    return (
      <div className="slide-container">
        {this.state.selected}
      </div>
    );
  }
}

Carousel.proptypes = {
  options: Proptypes.array.isRequired,
}

export default Carousel;
