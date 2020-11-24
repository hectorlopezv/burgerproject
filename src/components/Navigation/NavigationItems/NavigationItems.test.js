//Unit Testing
import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//import components
import NavigationItems from './NavigationItems';
import NavigatiomItem from './NavigationItem/NavigationItem';

//CONNECT ENZYME
configure({adapter: new Adapter(),});



describe('<NavigationItems /> Test', () => {

    //write actual testing
    it('should render Two <NavigatiomItem/> elements if not authenticated', () => {
        //actual unit testing logic
        const wrapper =  shallow(<NavigationItems />);
        expect(wrapper.find(NavigatiomItem)).toHaveLength(2);
    });

    it('should render Three <NavigatiomItem/> elements if authenticated', () => {
        //actual unit testing logic
        const wrapper =  shallow(<NavigationItems isAuth />);
        expect(wrapper.find(NavigatiomItem)).toHaveLength(3);
    });


    
})