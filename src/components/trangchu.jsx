import React, { Component } from 'react'
import Carolsel1 from './carosel';
import Category from './category';
import Newproducts from './newproducts';
export default class trangchu extends Component {

    render() {
        return (
            <div>
                <Carolsel1/>
                <hr></hr>
                <Category></Category>
                <br />
                <Newproducts></Newproducts>
                <br />
            </div>
        )
    }
}
