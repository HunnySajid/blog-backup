import { ApolloClient, InMemoryCache } from "@apollo/client";

// https://api.github.com/graphql
const client = new ApolloClient({
    uri: "https://api.hashnode.com/",
    cache: new InMemoryCache(),
});

export default client;