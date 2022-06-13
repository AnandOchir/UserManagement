import { ApolloServer } from "apollo-server";
import typeDefs from './types/index';
import resolvers from './resolvers/index';
import mongoose from 'mongoose';


mongoose.connect(
    "mongodb+srv://admin:teJXEn9V8H3Sq4EV@maincluster.mgizziq.mongodb.net/?retryWrites=true&w=majority"
);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

const server = new ApolloServer({ typeDefs, resolvers })

server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});