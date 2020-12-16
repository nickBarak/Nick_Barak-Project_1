import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { User } from '../../types';

function Nav() {
    const user = useSelector(({ user } : { user : User }) => user);

    return (
        <nav>
            <NavLink to='/client' exact activeClassName="nav-selected">Home</NavLink>
            {user && <>
                <NavLink to='/client/pokemon' exact activeClassName="nav-selected">Pokemon</NavLink>
                <NavLink to='/client/abilities' exact activeClassName="nav-selected">Abilities</NavLink>
            </>
            }
            {user?.username === 'admin' && <NavLink to='/client/admin' exact activeClassName="nav-selected">Admin</NavLink>}
        </nav>
    )
}

export default Nav
