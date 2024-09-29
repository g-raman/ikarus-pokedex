import { Button, Input, Select, Spin, Table, TableColumnsType } from "antd";
import { Pokemon } from "../utils/types";
import { PokemonTypeBadge } from "./PokemonTypeBadge";
import { gql, useLazyQuery } from "@apollo/client";
import { pokemonTypes } from "../utils/PokemonTypeColourMap";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const columns: TableColumnsType<Pokemon> = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    sorter: (rowA, rowB) => rowB.id - rowA.id,
  },
  {
    title: "Name",
    dataIndex: ["name", "english"],
    key: "name",
    render: (value) => {
      const name = String(value).toLowerCase();
      return (
        <Link className="text-blue-500 underline" to={`/pokemon/${name}`}>
          {value}
        </Link>
      );
    },
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render(value, { id, name }) {
      return (
        <PokemonTypeBadge key={`${name.english}${id}`} id={id} types={value} />
      );
    },
  },
  {
    title: "HP",
    dataIndex: ["base", "HP"],
    key: "HP",
    sorter: (rowA, rowB) => rowB.base.HP - rowA.base.HP,
  },
  {
    title: "Attack",
    dataIndex: ["base", "Attack"],
    key: "Attack",
    sorter: (rowA, rowB) => rowB.base.Attack - rowA.base.Attack,
  },
  {
    title: "Defense",
    dataIndex: ["base", "Defense"],
    key: "Defense",
    sorter: (rowA, rowB) => rowB.base.Defense - rowA.base.Defense,
  },
  {
    title: "SpAtk",
    dataIndex: ["base", "SpAttack"],
    key: "SpAttack",
    sorter: (rowA, rowB) => rowB.base.SpAttack - rowA.base.SpAttack,
  },
  {
    title: "SpDef",
    dataIndex: ["base", "SpDefense"],
    key: "SpDefense",
    sorter: (rowA, rowB) => rowB.base.SpDefense - rowA.base.SpDefense,
  },
];

const QUERY_ALL_POKEMON = gql`
  query ($query: String, $type: String) {
    pokemons(query: $query, type: $type) {
      id
      name {
        english
      }
      type
      base {
        HP
        Attack
        Defense
        SpAttack
        SpDefense
      }
    }
  }
`;

export const Pokedex = () => {
  const [type, setType] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [fetchPokemon, { data }] = useLazyQuery(QUERY_ALL_POKEMON, {
    variables: { type, query: debouncedQuery },
  });

  function handleTypeSelection(selection: string) {
    setType(selection);
    fetchPokemon();
  }

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    setDebouncedQuery(event.target.value);
  }

  function debounce(fn, delay: number) {
    let timeoutId: number;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  const debounceHandleQueryChange = debounce(handleQueryChange, 500);

  function handleReset() {
    setDebouncedQuery("");
    setType("");
  }

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  if (!data) {
    return <Spin size="large" />;
  }

  return (
    <div className="px-32 py-16">
      <div className="flex gap-4">
        <Input onChange={debounceHandleQueryChange} />
        <Select
          className="w-1/4"
          placeholder="Select a type"
          value={type}
          options={pokemonTypes}
          onSelect={handleTypeSelection}
        />
        <Button type="primary" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <Table<Pokemon>
        pagination={{
          defaultPageSize: 10,
          showPrevNextJumpers: true,
          showSizeChanger: true,
          position: ["topRight", "bottomRight"],
        }}
        dataSource={data.pokemons}
        columns={columns}
      />
    </div>
  );
};
