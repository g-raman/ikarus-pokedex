import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Pokedex } from "./components/Pokedex";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Pokemon } from "./components/Pokemon";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:3000/graphql",
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Pokedex />,
    },
    {
      path: "pokemon/:name",
      element: <Pokemon />,
    },
  ]);
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
