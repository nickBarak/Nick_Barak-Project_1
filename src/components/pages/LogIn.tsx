import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import updateUser from '../../store/actions/updateUser.action';
import { SIGNUP, LOGIN } from '../../store/types';
import Layout from '../layout';
import API from '../../resources';

interface Props {
    type : typeof SIGNUP | typeof LOGIN;
}

interface FormData {
    username : string;
    password : string;
    confirmPassword? : string | null;
}

const LogIn = ({ type } : Props) => {
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState<FormData>({ username: '', password: '', confirmPassword: type === SIGNUP ? '' : null });
    const dispatch = useDispatch();
    const history = useHistory();

    const onChange = (e : ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name] : e.target.value });

    const onSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (type === SIGNUP && (formData.password !== formData.confirmPassword)) return setError('Passwords must match');
        
        let response = await fetch(API + `/${type === SIGNUP ? 'signup' : 'login'}`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: formData.username,
                password: formData.password
            }),
            credentials: 'include'
        });

        let msg = '';
        switch (response.status) {
            case 200:
                const user = { username: formData.username }
                dispatch( updateUser(type, user) );
                history.push('/');
                return;
            case 422:
                msg = 'Username not available';
                break;
            case 401:
                msg = 'Invalid username/password';
                break;
            default:
                msg = type === SIGNUP ? 'Error registering user' : 'Error signing in';
        }
        setError(msg);
    }

    return (
        <Layout>
            <div className="PAGE-LOGIN">
                <h3>Please enter a username and password to {type === SIGNUP ? 'sign up' : 'log in'}</h3>
                <div>{error}</div>
                <form onSubmit={onSubmit}>
                    <input className="input" type="text" name="username" placeholder="username" onChange={onChange} />
                    <input className="input" type="password" name="password" placeholder="password" onChange={onChange} />
                    {type === SIGNUP && 
                        <input className="input" type="password" name="confirmPassword" placeholder="confirm password" onChange={onChange} />
                    }
                    <button className="btn">Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default LogIn;