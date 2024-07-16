import { userResolvers } from './user.js';
export const resolvers = {
    Query: Object.assign({}, userResolvers.Query),
    Mutation: Object.assign({}, userResolvers.Mutation),
};
