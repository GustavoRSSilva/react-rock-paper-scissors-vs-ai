import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import toJson from 'enzyme-to-json';
import App from './App';


describe('<App />', () => {
  it('renders 1 <App /> component', () => {
    const component = shallow(<App />);
    expect(component).toHaveLength(1);
  })

  it('It renders the state correctly', () => {
    const component = mount(<App />);
    expect(component.state()).toEqual({
      playerOneMove: null,
      playerTwoMove: null,
      errorLog: null,
      result: null,
    });
  })

  it('The Player picks rock, set the player move to rock', () => {
    const component = mount(<App />);
    const rockButton = component.find('button.rock-btn');
    expect(toJson(rockButton)).toMatchSnapshot();

    rockButton.simulate('click');
    expect(component.state().playerOneMove).toBe('rock');
  })

  it('The Player picks paper, set the player move to paper', () => {
    const component = mount(<App />);
    const paperButton = component.find('button.paper-btn');
    expect(toJson(paperButton)).toMatchSnapshot();

    paperButton.simulate('click');
    expect(component.state().playerOneMove).toBe('paper');
  })

  it('The Player picks scissors, set the player move to scissors', () => {
    const component = mount(<App />);
    const scissorsButton = component.find('button.scissors-btn');
    expect(toJson(scissorsButton)).toMatchSnapshot();

    scissorsButton.simulate('click');
    expect(component.state().playerOneMove).toBe('scissors');
  })

  it('The Ai picks a valid move after the player', () => {
    const component = mount(<App />);
    const availableMoves = ['rock', 'paper', 'scissors'];

    const scissorsButton = component.find('button.rock-btn');
    scissorsButton.simulate('click');

    expect(availableMoves).toContain(component.state().playerTwoMove);
  })

  it('The game ends and show the result after both players set the moves', () => {
    const component = mount(<App />);
    const scissorsButton = component.find('button.rock-btn');
    scissorsButton.simulate('click');

    expect(component.state().result).toBeTruthy();
  })
})
