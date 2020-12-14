import React from 'react'
import { Ability as AbilityType } from '../types';

interface Props {
    ability : AbilityType;
}

const Ability = ({ ability } : Props) => {
    return (
        <li>
            <div>
                <strong>Name: </strong>
                <span>{ability.name}</span>
            </div>
            <div>
                <strong>Description: </strong>
                <span>{ability.description}</span>
            </div>
        </li>
    )
}

export default Ability
