import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PokedexPage } from "./pages/PokedexPage";
import { PokemonPage } from "./pages/PokemonPage";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:3000/graphql",
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
