import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import { User } from './types';
import { SIGNUP, LOGIN, POKEMON, ABILITIES } from './store/types';
import { routes } from './resources';

import Home from './components/pages/Home';
import ListSearch from './components/ListSearch';
import LogIn from './components/pages/LogIn';
import Admin from './components/pages/Admin';

import Redirect from './components/pages/Redirect';

function App() {
  const user = useSelector(({ user } : { user : User }) => user);

  return (
    <BrowserRouter>
      <Switch>
        {/* Whether logged in or not, precedent */}
        <Route path='/' exact component={Home} />

        {user
          ? // If logged in
            [
              <Route key={'/pokemon'} path='/pokemon' exact component={() => <ListSearch type={POKEMON} />} />,
              <Route key={'/abilities'} path='/abilities' exact component={() => <ListSearch type={ABILITIES} />} />
            ]
          : // If not
            [
              <Route key={'/signup'} path='/signup' exact component={() => <LogIn type={SIGNUP} />} />,
              <Route key={'/login'} path='/login' exact component={() => <LogIn type={LOGIN} />} />
            ]
        }

        {user && user.username === 'admin' &&
          <Route key="/admin" path="/admin" component={Admin} />
        }

        {/* Whether logged in or not, ultimate */}
        {routes.map(route => <Route key={route} path={route} exact component={Redirect} />)}
        <Route path='/' render={() => <><div>404: Page Not Found</div> <button><Link to='/'>Back to Home</Link></button></>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
