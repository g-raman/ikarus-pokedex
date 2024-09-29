import { gql, useQuery } from "@apollo/client";
import { Image, Progress, Spin } from "antd";
import { useParams } from "react-router-dom";
import { Pokemon as PokemonType } from "../utils/types";
import { PokemonTypeBadge } from "./PokemonTypeBadge";
import { PokemonStatsComponent } from "./PokemonStatsComponent";

const QUERY_POKEMON = gql`
  query ($name: String) {
    pokemon(name: $name) {
      id
      name {
        english
        french
        japanese
        chinese
      }
      type
      base {
        HP
        Attack
        Defense
        SpAttack
        SpDefense
        Speed
      }
    }
  }
`;

export const Pokemon = () => {
  const { name } = useParams();
  const { data } = useQuery(QUERY_POKEMON, { variables: { name } });

  if (!data) {
    return <Spin size="large" />;
  }
  const pokemon: PokemonType = data.pokemon;
  const stats = pokemon.base;
  const statsTotal =
    stats.HP +
    stats.Attack +
    stats.Defense +
    stats.SpAttack +
    stats.SpDefense +
    stats.Speed;

  const maxStat = Math.max(
    stats.HP,
    stats.Attack,
    stats.Defense,
    stats.SpAttack,
    stats.SpDefense,
    stats.Speed,
  );

  return (
    <div className="px-32 py-16">
      <div className="flex justify-center gap-8">
        <Image src={`https://img.pokemondb.net/artwork/${name}.jpg`} />
        <div className="flex flex-col gap-4 text-3xl">
          <p className="font-bold text-7xl">{pokemon.name.english}</p>

          <p>French: {pokemon.name.french}</p>
          <p>Japanese: {pokemon.name.japanese}</p>
          <p>Chinese: {pokemon.name.chinese}</p>

          <PokemonTypeBadge id={pokemon.id} types={pokemon.type} />
        </div>

        <div className="flex flex-col w-1/2">
          <PokemonStatsComponent pokemon={pokemon} />
        </div>
      </div>
      <p>Total: {statsTotal}</p>
    </div>
  );
};
