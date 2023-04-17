import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SUPABASE_GQL_URL,
  credentials: 'same-origin',
});

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SUPABASE_GQL_URL,
  cache: new InMemoryCache(),
  link,
});
