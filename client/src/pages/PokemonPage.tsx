import { gql, useQuery } from "@apollo/client";
import { Image, Spin } from "antd";
import { useParams } from "react-router-dom";
import { Pokemon } from "../utils/types";
import { PokemonTypeBadge } from "../components/PokemonTypeBadge";
import { PokemonStatsComponent } from "../components/PokemonStatsComponent";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";

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

export const PokemonPage = () => {
  const { name } = useParams();
  const { data } = useQuery(QUERY_POKEMON, { variables: { name } });

  if (!data) {
    return <Spin size="large" />;
  }
  const pokemon: Pokemon = data.pokemon;
  const stats = pokemon.base;
  const statsTotal =
    stats.HP +
    stats.Attack +
    stats.Defense +
    stats.SpAttack +
    stats.SpDefense +
    stats.Speed;

  return (
    <>
      <Header />

      <div className="flex flex-col justify-center items-center px-32 gap-8">
        <div className="flex justify-center gap-8">
          <Image src={`https://img.pokemondb.net/artwork/${name}.jpg`} />
          <div className="flex flex-col gap-4 text-3xl justify-between">
            <p className="font-bold text-7xl">{pokemon.name.english}</p>

            <div className="flex gap-2 text-base">
              {pokemon.type.map((type) => (
                <PokemonTypeBadge id={pokemon.id} type={type} />
              ))}
            </div>

            <p>French: {pokemon.name.french}</p>
            <p>Japanese: {pokemon.name.japanese}</p>
            <p>Chinese: {pokemon.name.chinese}</p>
          </div>
        </div>

        <div className="flex flex-col w-1/2 gap-4">
          <PokemonStatsComponent pokemon={pokemon} />
          <p className="text-xl font-bold">Total: {statsTotal}</p>
        </div>
      </div>

      <Footer />
    </>
  );
};
