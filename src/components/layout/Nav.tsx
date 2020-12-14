import React from 'react';
import { NavLink, Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { User } from '../../types';
import updateUser from '../../store/actions/updateUser.action';
import { LOGOUT } from '../../store/types';
import API from '../../resources';

function Nav() {
    const user = useSelector(({user} : { user: User }) => user);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const logOut = async () => {
        let response = await fetch(API + '/logout');
        if (response.ok) {
            dispatch( updateUser(LOGOUT, null) );
            history.push('/');
        }
    }

    return (
        <nav>
            {location.pathname !== '/' && <NavLink to='/' activeClassName="nav-selected">Home</NavLink>}
            {user
                ?
                    <>
                        <NavLink to='/pokemon' activeClassName="nav-selected">Pokemon</NavLink>
                        <NavLink to='/abilities' activeClassName="nav-selected">Abilities</NavLink>
                        <button onClick={logOut}>Log out</button>
                    </>
                :
                    <span>
                        <button><Link to='/signup'>Sign up</Link></button>
                        <button><Link to='/login'>Log in</Link></button>
                    </span>
            }
        </nav>
    )
}

export default Nav
