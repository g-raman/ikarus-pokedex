import { GraphQLList, GraphQLObjectType, GraphQLSchema } from "graphql";

const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");
const { pokemonType } = require("./schema/schema.ts");
const pokedex = require("./data/pokedex.json");

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    pokemon: {
      type: new GraphQLList(pokemonType),
      resolve: () => pokedex,
    },
  },
});

const schema = new GraphQLSchema({ query: queryType });

const app = express();

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
