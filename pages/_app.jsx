import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import 'tailwindcss/tailwind.css';
import { offsetLimitPagination } from '@apollo/client/utilities';
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: offsetLimitPagination(),
      },
    },
    community: {
      fields: {
        posts: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  uri: '/api/graphql',
  cache,
});

const App = ({ Component, pageProps }) => (
  <>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  </>
);

export default App;
