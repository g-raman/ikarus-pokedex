import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Pokedex } from "./components/Pokedex";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:3000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <Pokedex />
    </ApolloProvider>
  );
}

export default App;
