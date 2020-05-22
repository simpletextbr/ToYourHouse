import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Singin from './pages/Singin';
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import newProduct from './pages/Inicio/newProduct';
import Acrescimo from './pages/Acrescimo';
import newAdds from './pages/Acrescimo/newAdds';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Singin} />
                <Route path="/login" component={Login}/>
                <Route path="/inicio/new" exact component={newProduct}/>
                <Route path="/inicio" component={Inicio}/>
                <Route path="/acrescimo/new" exact component={newAdds}/>
                <Route path="/acrescimo" component={Acrescimo}/>
            </Switch>
        </BrowserRouter>
    );
}