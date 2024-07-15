import { startStandaloneServer } from "@apollo/server/standalone";
import { users } from "./data/mockdb.js";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolver.js";
import { Context } from "./types/types";

export const server = new ApolloServer<Context>({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ users }),
  listen: { port: 4000 }
});

console.log(`🚀  Server ready at: ${url}`);