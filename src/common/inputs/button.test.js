import React from 'react'
import { shallow } from 'enzyme'
import Button from "./button";

import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'
import renderer from 'react-test-renderer'


configure({adapter: new Adapter()});

describe('Button test', () => {
  const onClick = jest.fn();
  const props = {
    facebook: true,
    onClick: onClick
  }
  const wrapper = shallow(<Button {...props} />)
  it('Renders footer correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  });

  // check if renders one buttons
  expect(wrapper.find('button')).toHaveLength(1);
})
