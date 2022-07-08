import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { CONFIG } from './config/env';

const httpLink = createHttpLink({
  uri: CONFIG.GITHUB_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const github_pat =  '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' // localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${CONFIG.GITHUB_TOKEN}`,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
