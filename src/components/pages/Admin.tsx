import React, { useState, FormEvent } from 'react';
import Layout from './../layout';
import { POKEMON, ABILITIES } from '../../store/types';
import API from '../../resources';

interface Props {
    
}

const Admin = (props: Props) => {
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<string>(POKEMON);
    const [method, setMethod] = useState<string>('POST');
    const [type1, setType1] = useState<string>('');
    const [type2, setType2] = useState<string>('');
    const [abilityName, setAbilityName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const onSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let response = await fetch(API + `${type === POKEMON ? '/pokemon' : '/ability'}`, { 
            method,
            headers: { 'Content-Type' : 'application/json' },
            body: type === POKEMON
                ? JSON.stringify({
                name,
                type1,
                type2,
                abilityName
            })
                : JSON.stringify({
                    name,
                    description
                })
        });
        if (response.status === 200) setMessage('Edit performed successfully');
    }

    return (
        <Layout>
            <div className="PAGE-ADMIN">
                <div>{message}</div>
                <form>
                    <div className="types">
                        <label className="radio" ><input type="radio" name="type" defaultChecked value={POKEMON} onChange={e => setType(e.target.value)} /> Pokemon</label>
                        <label className="radio" ><input type="radio" name="type" value={ABILITIES} onChange={e => setType(e.target.value)} /> Ability</label>
                    </div>
                    <div>
                        <label className="radio" ><input type="radio" name="method" defaultChecked value={'POST'} onChange={e => setMethod(e.target.value)} /> Add</label>
                        <label className="radio" ><input type="radio" name="method" value={'DELETE'} onChange={e => setMethod(e.target.value)} /> Delete</label>
                    </div>
                </form>
                {method === 'DELETE'
                    ? <form>
                        <input type="text" placeholder="name" className="input" onChange={e=> setName(e.target.value)} />
                        <button className="btn">Submit</button>
                    </form>
                    : type === POKEMON
                    ?
                    <form onSubmit={onSubmit}>
                        <input type="text" className="input" placeholder="name" onChange={e => setName(e.target.value)}/>
                        <input type="text" className="input" placeholder="type 1" onChange={e => setType1(e.target.value)}/>
                        <input type="text" className="input" placeholder="type 2" onChange={e => setType2(e.target.value)}/>
                        <input type="text" className="input" placeholder="ability" onChange={e => setAbilityName(e.target.value)}/>
                        <button className="btn">Submit</button>
                    </form>
                    :
                    <form onSubmit={onSubmit}>
                        <input type="text" className="input" placeholder="name" onChange={e => setName(e.target.value)}/>
                        <input type="textarea" className="input" placeholder="description" onChange={e => setDescription(e.target.value)} />
                        <button className="btn">Submit</button>
                    </form>
                }
            </div>
        </Layout>
    )
}

export default Admin
