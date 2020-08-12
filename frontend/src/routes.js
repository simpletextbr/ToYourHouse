import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Singin from "./pages/Singin";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Newproduct from "./pages/Inicio/newProduct";
import Changepass from "./pages/Changepass";
import Acrescimo from "./pages/Acrescimo";
import Newadds from "./pages/Acrescimo/newAdds";
import Configurar from "./pages/Configurar";
import Uploadlogo from "./pages/Configurar/UploadLogo";
import Uploadcardapio from "./pages/Configurar/UploadCardapio";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Singin} />
        <Route path="/login" component={Login} />
        <Route path="/inicio/new" exact component={Newproduct} />
        <Route path="/changepass" exact component={Changepass} />
        <Route path="/inicio" component={Inicio} />
        <Route path="/acrescimo/new" exact component={Newadds} />
        <Route path="/acrescimo" component={Acrescimo} />
        <Route path="/config/upload/logo" exact component={Uploadlogo} />
        <Route
          path="/config/upload/cardapio"
          exact
          component={Uploadcardapio}
        />
        <Route path="/config" component={Configurar} />
      </Switch>
    </BrowserRouter>
  );
}
