import React from 'react'
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';

import 'jest-styled-components';
import Card, { Container, Title, Subtitle, TagContainer, IconContainer } from './card'
configure({adapter: new Adapter()});

describe('Card renders', () => {
    const onClick = jest.fn();
    const onClickRemove = jest.fn();
    const initProps = {
        id: '213ads4das6d',
        title: 'Movie dark',
        subtitle: 'Comedy',
        titleColor: "#ffffff",
        subtitleColor: "#595959",
        tag: 'Tagas',
        tagColor: "#595959",
        bottomIconName: 'font-awesome',
        bottomIconSize: 2,
        bottomIconColor: '#e50914',
        centerIconName: 'Ionicons',
        centerIconName: 'font-awesome',
        centerIconSize: 3,
        removeIconName: 'font-awesome-remove',
        centerIconColor: '#fffads',
        bgPhoto: 'https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg',
        onClick: onClick,
        onClickRemove: onClickRemove
    }

    const wrapper = shallow(<Card {...initProps} />)
    it('Renders card correctly', () => {
      expect(toJson(wrapper)).toMatchSnapshot()
    });
    // istestuok  Subtitle, TagContainer, IconContainer  -> situos pagal sita koda 40-45 eilutes cia
    test('Container works', () => {
        const title = renderer
          .create(<Title color={initProps.color} />)
          .toJSON()
        expect(title).toHaveStyleRule('color', initProps.color)
    })
    //
    const button = wrapper.find('#IconContainer');
    button.simulate('click')
    expect(onClick.mock.calls.length).toEqual(1);

    const removeBtn = wrapper.find('#remove');
    removeBtn.simulate('click')
    expect(onClickRemove.mock.calls.length).toEqual(1);
})
