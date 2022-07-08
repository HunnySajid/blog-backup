import { ApolloClient, InMemoryCache } from "@apollo/client";
import { CONFIG } from './config/env';

const client = new ApolloClient({
    uri: CONFIG.BASE_URL,
    cache: new InMemoryCache(),
});

export default client;