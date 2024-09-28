import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const nameType = new GraphQLObjectType({
  name: "PokemonName",
  fields: {
    english: { type: GraphQLString },
    japanese: { type: GraphQLString },
    chinese: { type: GraphQLString },
    french: { type: GraphQLString },
  },
});

const pokemonTypeType = new GraphQLEnumType({
  name: "PokemonType",
  values: {
    Normal: {},
    Fire: {},
    Water: {},
    Electric: {},
    Grass: {},
    Ice: {},
    Fighting: {},
    Poison: {},
    Ground: {},
    Flying: {},
    Psychic: {},
    Bug: {},
    Rock: {},
    Ghost: {},
    Dragon: {},
    Dark: {},
    Steel: {},
    Fairy: {},
  },
});

const pokemonStatsType = new GraphQLObjectType({
  name: "PokemonStats",
  fields: {
    HP: { type: GraphQLInt },
    Attack: { type: GraphQLInt },
    Defense: { type: GraphQLInt },
    SpAttack: { type: GraphQLInt },
    SpDefense: { type: GraphQLInt },
    Speed: { type: GraphQLInt },
  },
});

const pokemonType = new GraphQLObjectType({
  name: "Pokemon",
  fields: {
    id: { type: GraphQLID },
    name: { type: nameType },
    type: { type: new GraphQLList(pokemonTypeType) },
    base: { type: pokemonStatsType },
  },
});

exports.pokemonType = pokemonType;
