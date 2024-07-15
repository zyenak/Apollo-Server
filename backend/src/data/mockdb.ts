import { User } from "../types/types";
import { v4 as uuidv4 } from 'uuid';

export let users: User[] = [
  { id: uuidv4(), name: 'Zyena Kamran', email: 'zk@example.com' },
  { id: uuidv4(), name: 'Faizaan Talha', email: 'ft@example.com' },
];