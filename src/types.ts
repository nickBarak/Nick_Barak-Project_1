export interface Action {
    type : string;
    payload : any;
}

export interface User {
    username : string;
}

export interface Ability {
    name : string;
    description : string;
}

export interface Pokemon {
    name : string;
    type1 : string;
    type2 : string;
    abilityObj : Ability;
}