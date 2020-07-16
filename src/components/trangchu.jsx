import React, { Component } from 'react'
import Carolsel1 from './carosel';
import Category from './category';
import Newproducts from './newproducts';
import AoCarousel from './aocarousel';
import {Row,Col} from 'antd';
import GearCarousel from './gearcarousel';
import GundamCarousel from './gundamcarousel';
export default class trangchu extends Component {

    render() {
        return (
            <div>
                
                <Carolsel1></Carolsel1>
                <hr></hr>
                <Category></Category>
                <br />
                <Newproducts></Newproducts>
                <AoCarousel></AoCarousel>
                <GearCarousel></GearCarousel>
                <GundamCarousel></GundamCarousel>
                <br />
            </div>
        )
    }
}
