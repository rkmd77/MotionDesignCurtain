import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Layout from 'component/layout/index.jsx';
import Error from 'pages/error/index.jsx';

import ProductRouter from 'pages/product/product_router.jsx'
import './css/index.css'

class App extends React.Component{
    render(){
        let LayoutRouter = (
            <Layout> 
                <Switch>
                    <Route path="/product" component={ProductRouter}/>
                    <Redirect exact from="/" to="/product"/>
                    <Route component={Error}/>
                </Switch>
            </Layout>
        );
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" render={ props => LayoutRouter}/>
                </Switch>
            </BrowserRouter>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
)