import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Singin from './pages/Singin';
import Login from './pages/Login';
import Inicio from './pages/Inicio';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Singin} />
                <Route path="/login" component={Login}/>
                <Route path="/inicio" component={Inicio}/>
            </Switch>
        </BrowserRouter>
    );
}