//Unit Testing
import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//import components
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

//CONNECT ENZYME
configure({adapter: new Adapter(),});



describe('<NavigationItems /> Test', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    //write actual testing
    it('should render Two <NavigatiomItem/> elements if not authenticated', () => {
        //actual unit testing logic
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render Three <NavigatiomItem/> elements if authenticated', () => {
        //actual unit testing logic 
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    //contains
    it('should compare that /logout navigationLink exist', () => {
        //actual unit testing logic 
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link='/logout' >LogOut</NavigationItem>)).toEqual(true);

    });

    
})