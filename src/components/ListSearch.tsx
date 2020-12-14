import React, { useState, useEffect, FormEvent } from 'react'
import Layout from './layout';
import API from '../resources';
import { POKEMON, ABILITIES } from '../store/types';
import Pokemon from './Pokemon';
import Ability from './Ability';
import { Pokemon as PokemonType, Ability as AbilityType } from '../types';


interface Props {
    type : typeof POKEMON | typeof ABILITIES;
}

function guardType(type : typeof POKEMON | typeof ABILITIES, object : PokemonType | AbilityType) : boolean {
    switch (type) {
        case POKEMON:
            if (!('name' in object) || !('type1' in object) || !('type2' in object) || !('abilityObj' in object)) break;
            if (!('name' in object.abilityObj) || !('description' in object.abilityObj)) break;
            return true;
        case ABILITIES:
            if (!('name' in object) || !('description' in object)) break;
            return true;
        default:
            return false;
    }
    return false;
}

const ListSearch = ({ type } : Props) => {
    const [list, setList] = useState<[PokemonType | AbilityType]|null>(null);
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchSetting, setSearchSetting] = useState<string>('name');

    useEffect(() => {
        (async () => {
            let response = await fetch(API + `/${type === POKEMON ? 'pokemon' : 'ability'}`);
            let json = await response.json();
            setList(json);
        })();
    }, [type]);

    const onSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let response;
        if (!searchValue) {
            response = await fetch(API + `/${type === POKEMON ? 'pokemon' : 'ability'}`);
        } else response = await fetch(API + `/${type === POKEMON ? 'pokemon' : 'ability'}?${searchSetting}=${searchValue[0]?.toUpperCase() + searchValue.slice(1)}`);
        let json = await response.json();
        setList(json);
        if (!searchValue) {
            let target = e.target as HTMLFormElement;
            target.reset();
        }
    }

    return (
        <Layout>
            <div className="PAGE-LISTSEARCH">
                <form onSubmit={onSubmit}>
                    {type === POKEMON &&
                        <>
                            <label><input type="radio" name="searchRadio" value="name" defaultChecked onChange={e => setSearchSetting(e.target.value)}/> Name </label>
                            <label><input type="radio" name="searchRadio" value="type" onChange={e => setSearchSetting(e.target.value)}/> Type </label>
                        </>
                    }
                    <input type="text" name="searchValue" onChange={e => setSearchValue(e.target.value)} />
                    <button>Submit</button>
                    <button onClick={() => setSearchValue('')}>Show All</button>
                </form>
                {!list
                    ? <div>No results found</div>
                    :
                        <ol className="pokemon">
                            {list.map(item => {
                                switch (type) {
                                    case POKEMON:
                                        if (!guardType(type, item)) break;
                                        return <Pokemon key={item.name} pokemon={item as PokemonType} />;
                                    case ABILITIES:
                                        if (!guardType(type, item)) break;
                                        return <Ability key={item.name} ability={item as AbilityType} />;
                                    default:
                                        break;
                                }
                                return <li key={Math.random()}>Invalid list item</li>
                            })}
                        </ol>
                }
            </div>
        </Layout>
    )
}

export default ListSearch;