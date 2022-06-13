import { 
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";


export const apolloClient = new ApolloClient({
  uri: "https://user-management-ten.vercel.app/",
  cache: new InMemoryCache()
}); 

 