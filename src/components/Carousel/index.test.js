import React from 'react';
import { shallow } from 'enzyme';
import Carousel from './index';

describe('<Carousel />', () => {
  it('renders 1 <Carousel /> component', () => {
    const component = shallow(<Carousel options={[1,2,3]}/>);
    expect(component).toHaveLength(1);
  })
})
