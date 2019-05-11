import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
// import { shallow } from 'enzyme';
import SignUpForm from '../src/components/SignUpForm';

describe('<SignUpForm />', () => {
  it('Should match the snapshot', () => {
    const tree = renderer.create(<MemoryRouter><SignUpForm /></MemoryRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
