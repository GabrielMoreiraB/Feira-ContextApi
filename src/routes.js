import Carrinho from 'pages/Carrinho';
import Feira from 'pages/Feira';
import Login from 'pages/Login';
import { useState } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { UsuarioProvider } from 'common/context/Usuario';

const Router = () => {
    
    return ( 
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <UsuarioProvider>
                        <Login/>
                    </UsuarioProvider>
                </Route>

                <Route path='/feira'>
                    <Feira />

                    <Route path='/carrinho'>
                    <Carrinho/>
                </Route>
                </Route>
            </Switch>
        </BrowserRouter>
     );
}
 
export default Router;