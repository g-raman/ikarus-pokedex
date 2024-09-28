import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import Pokemon from "./helpers/types";

import { IFuseOptions } from "fuse.js";
const Fuse = require("fuse.js");
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");
const cors = require("cors");
const { pokemonType } = require("./schema/schema.ts");
const pokedex: [Pokemon] = require("./data/pokedex.json");

const searchOptions: IFuseOptions<Pokemon> = {
  isCaseSensitive: false,
  shouldSort: true,
  findAllMatches: true,
  ignoreLocation: true,
  keys: ["name.english"],
};

const fuse = new Fuse(pokedex, searchOptions);

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    pokemons: {
      type: new GraphQLList(pokemonType),
      args: {
        query: { type: GraphQLString },
        type: { type: GraphQLString },
      },
      resolve: (_, { query, type }) => {
        let results: Pokemon[];
        if (!query) {
          results = pokedex;
        } else {
          results = fuse.search(query).map((result) => result.item);
        }

        if (!type) {
          return results;
        }

        return results.filter((pokemon) => pokemon.type.includes(type));
      },
    },
    pokemon: {
      type: pokemonType,
      args: {
        name: { type: GraphQLString },
      },
      resolve: (_, { name }) => {
        const found = pokedex.find(
          (pokemon) =>
            pokemon.name.english.toLowerCase() === name.toLowerCase(),
        );
        return found;
      },
    },
  },
});

const schema = new GraphQLSchema({ query: queryType });

const app = express();

app.use(cors());

app.all(
  "/graphql",
  createHandler({
    schema,
  }),
);

// Serve the GraphiQL IDE.
app.get("/", (_, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error starting server on port: ${PORT}`);
    return;
  }

  console.log(`Success! Server listening on port: ${PORT}`);
});
