import React from 'react';
import { shallow } from 'enzyme';
import Check from '../src/container/check';

describe('This is a minimal test for App container', () => {
  it('should return the div in app container', () => {
    const wrapper = shallow(<Check />);
    expect(wrapper.find(<div>This is the react front-end for questioner</div>));
  });
});
