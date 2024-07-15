import { v4 as uuidv4 } from 'uuid';
import { User, CreateUserInput, UpdateUserInput, Context } from "./types/types";

export const resolvers = {
    Query: {
        users: (_: any, __: any, { users }: Context) => users,
        user: (_: any, { id }: { id: string }, { users }: Context) => users.find(user => user.id === id),
    },
    Mutation: {
        createUser: (_: any, { input }: { input: CreateUserInput }, { users }: Context) => {
            const newUser = { id: uuidv4(), ...input };
            users.push(newUser);
            return newUser;
        },
        updateUser: (_: any, { id, input }: { id: string; input: UpdateUserInput }, { users }: Context) => {
            const userIndex = users.findIndex(user => user.id === id);
            if (userIndex === -1) return null;
            const updatedUser = { ...users[userIndex], ...input };
            users[userIndex] = updatedUser;
            return updatedUser;
        },
        deleteUser: (_: any, { id }: { id: string }, { users }: Context) => {
            const userIndex = users.findIndex(user => user.id === id);
            if (userIndex === -1) return null;
            const deletedUser = users.splice(userIndex, 1)[0];
            return deletedUser;
        },
    },
};
