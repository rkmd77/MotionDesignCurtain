import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'

import ProductList      from 'pages/product/index.jsx';

class ProductRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/product" component={ProductList}/>
                {/* <Redirect exact from="/product" to="/product/index"/> */}
            </Switch>
        )
    }
}
export default ProductRouter;