import { v4 as uuidv4 } from 'uuid';
export const userResolvers = {
    Query: {
        users: (_, __, { users }) => users,
        user: (_, { id }, { users }) => users.find(user => user.id === id),
    },
    Mutation: {
        createUser: (_, { input }, { users }) => {
            const newUser = Object.assign({ id: uuidv4() }, input);
            users.push(newUser);
            return newUser;
        },
        updateUser: (_, { id, input }, { users }) => {
            const userIndex = users.findIndex(user => user.id === id);
            if (userIndex === -1)
                return null;
            const updatedUser = Object.assign(Object.assign({}, users[userIndex]), input);
            users[userIndex] = updatedUser;
            return updatedUser;
        },
        deleteUser: (_, { id }, { users }) => {
            const userIndex = users.findIndex(user => user.id === id);
            if (userIndex === -1)
                return null;
            const deletedUser = users.splice(userIndex, 1)[0];
            return deletedUser;
        },
    },
};
