import React, { Component } from 'react'
import Carolsel1 from './carosel';
import Category from './category';
import Newproducts from './newproducts';
export default class trangchu extends Component {

    SPChon=[];

    laySPChon(spchon){
        this.SPChon=spchon;
    }
    render() {
        return (
            <div>
                <Carolsel1></Carolsel1>
                <hr></hr>
                <Category></Category>
                <br />
                <Newproducts laySPChon={this.laySPChon}></Newproducts>
                <br />
            </div>
        )
    }
}
