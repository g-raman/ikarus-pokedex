import { Table, TableColumnsType } from "antd";
import { Pokemon } from "../utils/types";
import { PokemonTypeBadge } from "./PokemonTypeBadge";
import { gql, useQuery } from "@apollo/client";

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
  query {
    pokemons(query: "") {
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
  const { data } = useQuery(QUERY_ALL_POKEMON);
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
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
  );
};
