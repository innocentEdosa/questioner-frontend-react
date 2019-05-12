import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
// import { shallow } from 'enzyme';
import SignUpForm from '../src/components/SignUpForm';

describe('<SignUpForm />', () => {
  it('Should match the snapshot', () => {
    const tree = renderer.create(<MemoryRouter><SignUpForm values={{ formError: { email: 'please provide an email' } }} /></MemoryRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
