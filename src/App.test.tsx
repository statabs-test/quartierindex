import * as React from 'react';
import { shallow } from 'enzyme';
import App from './App';


// describe what we are testing
describe('App Component', () => {

  it('should renders the wrapping div', () => {
    expect(shallow(<App/>).exists()).toBe(true)
  });

});
