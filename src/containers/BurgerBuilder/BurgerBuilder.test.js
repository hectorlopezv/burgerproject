import { BurgerBuilder } from './BurgerBuilder';
//Unit Testing
import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import buildControls from '../../components/Burger/BuildControls/BuildControls';

//CONNECT ENZYME
configure({adapter: new Adapter(),});

//Test Container wihtout test connect 

describe('Testing BurgerBuilder Container', () => {
    let wrapper;
    beforeEach(() =>{
        wrapper = shallow(<BurgerBuilder onInitIngredient={() => {}}/>);
    });

    it('should render <BuildControls /> when receiving ingridients', () => {
        wrapper.setProps({ings:{salad:0}});
        expect(wrapper.find(buildControls)).toHaveLength(1);
    });


});

