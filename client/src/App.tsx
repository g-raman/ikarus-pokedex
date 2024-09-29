import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Pokemon } from "./components/Pokemon";
import { PokedexPage } from "./pages/PokedexPage";

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
