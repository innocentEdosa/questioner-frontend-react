import React from 'react';
import { shallow } from 'enzyme';
import Navigation from '../src/components/Nav';

describe('<Navigation/>', () => {
  it('Should return a nav element', () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper.find(<nav />));
  });
});
