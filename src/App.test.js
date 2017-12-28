import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  it('renders 1 <App /> component', () => {
    const component = shallow(<App />);
    expect(component).toHaveLength(1);
  })
})
