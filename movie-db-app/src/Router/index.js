import React from 'react';
import { Switch, Redirect } from 'react-router-dom'
import PublicRoute from './PublicRouter';
import PrivateRoute from './PrivateRouter';
import MovieDetails from '../pages/MovieDetails';
import Home from '../pages/Home';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import Crud from '../pages/Crud';

const Router = () => {
    return (
        <Switch>
            <PublicRoute exact path='/' component={LandingPage} restricted={false} />
            <PublicRoute exact path='/login' component={LoginPage} restricted={false} />
            <PublicRoute exact path='/signup' component={SignUpPage} restricted={false} />
            <PrivateRoute exact path='/home' component={Home} restricted />
            <PrivateRoute exact path='/crud' component={Crud} restricted />
            <PrivateRoute exact path='/movie' component={MovieDetails} restricted />
            <Redirect exact to='/' />
        </Switch>
    );
}
export default Router;
