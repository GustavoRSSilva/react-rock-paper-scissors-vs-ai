import React, { Component } from 'react';
import Proptypes from 'prop-types';

//  TODO find a real library that doesnt realy on setTimeout....
class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.options[Math.floor(Math.random() * props.options.length)],
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.setSelectedOption.bind(this), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.interval)
  }

  setSelectedOption() {
    const options = this.props.options;

    //  flip throw the array with {(new Data).getTime() % 3} will iterate from 0 to 2.
    const date = new Date();
    const index = Math.floor(date.getTime() % 3);
    this.setState({ selected: options[index] });
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
