import { startStandaloneServer } from "@apollo/server/standalone";
import { users } from "./data/mockdb.js";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema/index.js";
import { resolvers } from "./resolvers/index.js";
export const server = new ApolloServer({
    typeDefs,
    resolvers
});
const { url } = await startStandaloneServer(server, {
    context: async () => ({ users }),
    listen: { port: 4000 }
});
console.log(`🚀  Server ready at: ${url}`);
