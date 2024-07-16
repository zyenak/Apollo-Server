import { User as UserModel } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const userResolvers = {
    Query: {
        users: async (_, __, { currentUser }) => {
            //   if (!currentUser) {
            //     throw new Error('Not authenticated');
            //   }
            return await UserModel.findAll();
        },
        user: async (_, { id }, { currentUser }) => {
            //   if (!currentUser) {
            //     throw new Error('Not authenticated');
            //   }
            return await UserModel.findByPk(id);
        },
    },
    Mutation: {
        createUser: async (_, { input }) => {
            const hashedPassword = await bcrypt.hash(input.password, 10);
            const newUser = await UserModel.create(Object.assign(Object.assign({}, input), { password: hashedPassword }));
            return newUser;
        },
        updateUser: async (_, { id, input }, { currentUser }) => {
            if (!currentUser) {
                throw new Error('Not authenticated');
            }
            const user = await UserModel.findByPk(id);
            if (!user)
                return null;
            await user.update(input);
            return user;
        },
        deleteUser: async (_, { id }, { currentUser }) => {
            if (!currentUser) {
                throw new Error('Not authenticated');
            }
            const user = await UserModel.findByPk(id);
            if (!user)
                return null;
            await user.destroy();
            return user;
        },
        loginUser: async (_, { email, password }) => {
            const user = await UserModel.findOne({ where: { email } });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new Error('Invalid credentials');
            }
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token };
        },
    },
};
