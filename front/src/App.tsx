import Router from './router';
import { apolloClient } from './graphql'
import { ApolloProvider } from '@apollo/client';

const App = () => {
  sessionStorage.clear()
  return (
    <ApolloProvider client={apolloClient} >
      <Router />
    </ApolloProvider>
  );
}

export default App;
