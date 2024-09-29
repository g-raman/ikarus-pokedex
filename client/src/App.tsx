import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PokedexPage } from "./pages/PokedexPage";
import { PokemonPage } from "./pages/PokemonPage";

const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT;
function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: GRAPHQL_ENDPOINT,
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PokedexPage />,
    },
    {
      path: "pokemon/:name",
      element: <PokemonPage />,
    },
  ]);
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
