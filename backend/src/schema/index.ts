import { mergeTypeDefs } from "@graphql-tools/merge";
import { typeDefs as userTypeDefs } from "./user.js";

const mergedTypeDefs = mergeTypeDefs([
  userTypeDefs,
]);

export { mergedTypeDefs as typeDefs };
