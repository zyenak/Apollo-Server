import { User as UserModel } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateUserInput, UpdateUserInput, Context } from '../types/types';

export const userResolvers = {
  Query: {
    users: async (_: any, __: any, { currentUser }: Context) => {
    //   if (!currentUser) {
    //     throw new Error('Not authenticated');
    //   }
      return await UserModel.findAll();
    },
    user: async (_: any, { id }: { id: string }, { currentUser }: Context) => {
    //   if (!currentUser) {
    //     throw new Error('Not authenticated');
    //   }
      return await UserModel.findByPk(id);
    },
  },
  Mutation: {
    createUser: async (_: any, { input }: { input: CreateUserInput }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const newUser = await UserModel.create({ ...input, password: hashedPassword });
      return newUser;
    },
    updateUser: async (_: any, { id, input }: { id: string; input: UpdateUserInput }, { currentUser }: Context) => {
      if (!currentUser) {
        throw new Error('Not authenticated');
      }
      const user = await UserModel.findByPk(id);
      if (!user) return null;
      await user.update(input);
      return user;
    },
    deleteUser: async (_: any, { id }: { id: string }, { currentUser }: Context) => {
      if (!currentUser) {
        throw new Error('Not authenticated');
      }
      const user = await UserModel.findByPk(id);
      if (!user) return null;
      await user.destroy();
      return user;
    },
    loginUser: async (_: any, { email, password }: { email: string; password: string }) => {
      const user = await UserModel.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      return { token };
    },
  },
};
