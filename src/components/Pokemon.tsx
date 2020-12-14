import React from 'react'
import { Pokemon as PokemonType } from '../types';
import { Link } from 'react-router-dom';

interface Props {
    pokemon : PokemonType;
}

const Pokemon = ({ pokemon } : Props) => {
    return (
        <li>
            <div>
                <strong>Name: </strong>
                <span>{pokemon.name}</span>
            </div>
            <div>
                <strong>Type: </strong>
                <span>{pokemon.type1 === pokemon.type2 ? pokemon.type1 : `${pokemon.type1}, ${pokemon.type2}`}</span>
            </div>
            <div>
                <strong>Ability: </strong>
                <span><Link to={`/abilities?name=${pokemon.abilityObj.name}`}>{pokemon.abilityObj.name}</Link></span>
            </div>
        </li>
    )
}

export default Pokemon
