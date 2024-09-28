import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import Pokemon from "./helpers/types";

const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");
const cors = require("cors");
const { pokemonType } = require("./schema/schema.ts");
const pokedex: [Pokemon] = require("./data/pokedex.json");

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    pokemons: {
      type: new GraphQLList(pokemonType),
      args: {
        take: { type: GraphQLInt },
        skip: { type: GraphQLInt },
      },
      resolve: (_, { take = 10, skip = 0 }) =>
        pokedex.slice(0 + skip, take + skip),
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
