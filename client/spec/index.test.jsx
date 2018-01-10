import React from 'react';
import ReactDOM from 'react-dom';
import { render, shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import SignUp from '../src/components/Signup.jsx';
import Login from '../src/components/Login.jsx'

test('Signup should render a form', () => {
  const signup = shallow(<SignUp />);
  expect(signup.find('form').length === 1);
});

test('Signup should call a function when submitting the form', () => {
  const signup = shallow(<SignUp />);
  signup.setState({animal: 'peter'});
  signup.find('.submitCreateForm').simulate('click');
  expect(signup.state().animal).to.equal('peter')
})

test('Login should render a form', () => {
  const login = shallow(<Login />);
  expect(login.find('form').length === 1);
})
